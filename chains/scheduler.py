from __future__ import annotations

import asyncio
import logging
from datetime import datetime, timedelta, time as dtime
from functools import partial
from pathlib import Path

from chains.daily_lock import lock_daily_ohlc
from chains.daily_runner import is_today_predicted, run_daily_prediction
from chains.events import hub as event_hub
from chains.runner import run_gold_analysis_once
from chains.verifier import verify_prediction
from config import settings
from instruments import current_db_path, list_instruments, use_instrument
from storage.backup import backup_database, latest_backup_date, rotate_backups
from storage.record_manager import init_storage

try:
    from zoneinfo import ZoneInfo
except ImportError:  # pragma: no cover - py < 3.9
    ZoneInfo = None  # type: ignore


logger = logging.getLogger(__name__)

_BJ_TZ = ZoneInfo("Asia/Shanghai") if ZoneInfo else None

_tasks: list[asyncio.Task] = []


def _now_beijing() -> datetime:
    if _BJ_TZ:
        return datetime.now(tz=_BJ_TZ)
    # If zoneinfo unavailable, assume server is already on Asia/Shanghai (deploy.sh enforces this).
    return datetime.now()


def _next_fire(at: dtime, *, now: datetime | None = None) -> datetime:
    current = now or _now_beijing()
    candidate = current.replace(hour=at.hour, minute=at.minute, second=0, microsecond=0)
    if candidate <= current:
        candidate += timedelta(days=1)
    return candidate


async def _interval_loop(instrument_key: str) -> None:
    interval = max(int(settings.scheduler_interval_seconds), 60)
    logger.info(
        "Interval scheduler started for %s: interval=%ss", instrument_key, interval
    )
    try:
        await asyncio.sleep(2)
        while True:
            try:
                with use_instrument(instrument_key):
                    record = await asyncio.to_thread(run_gold_analysis_once, "scheduler")
                    payload = record.model_dump(mode="json")
                    payload["asset"] = instrument_key
                    await event_hub.publish("analysis_record_added", payload)
                logger.info(
                    "Interval(%s) finished status=%s latency_ms=%s",
                    instrument_key, record.status.value, record.latency_ms,
                )
            except Exception:
                logger.exception("Interval(%s) failed; will retry next cycle", instrument_key)
            await asyncio.sleep(interval)
    except asyncio.CancelledError:
        logger.info("Interval scheduler for %s stopped", instrument_key)
        raise


async def _wall_clock_loop(name: str, fire_time: dtime, action) -> None:
    logger.info("Wall-clock scheduler '%s' started at %s Beijing", name, fire_time)
    try:
        # Cold start catch-up: if we're past fire_time today and action condition isn't satisfied, run once.
        try:
            await action(reason="cold-start")
        except Exception:
            logger.exception("Cold-start run for %s failed", name)
        while True:
            now = _now_beijing()
            fire_at = _next_fire(fire_time, now=now)
            sleep_seconds = max(15, int((fire_at - now).total_seconds()))
            await asyncio.sleep(sleep_seconds)
            try:
                await action(reason="scheduled")
            except Exception:
                logger.exception("Scheduled run for %s failed", name)
            await asyncio.sleep(60)  # avoid double-fire within same minute
    except asyncio.CancelledError:
        logger.info("Wall-clock scheduler '%s' stopped", name)
        raise


async def _daily_action(instrument_key: str, *, reason: str) -> None:
    today = _now_beijing().strftime("%Y-%m-%d")
    with use_instrument(instrument_key):
        if reason == "cold-start" and is_today_predicted(today):
            logger.info(
                "daily(%s): today already predicted, skip cold-start", instrument_key
            )
            return
        prediction = await asyncio.to_thread(run_daily_prediction, today)
        payload = prediction.model_dump(mode="json")
        payload["asset"] = instrument_key
        await event_hub.publish("daily_prediction_ready", payload)
    logger.info(
        "daily(%s, %s) done date=%s tomorrow=%s confidence=%.2f",
        instrument_key, reason,
        prediction.prediction_date,
        prediction.tomorrow_direction.value,
        prediction.tomorrow_confidence or 0,
    )


async def _lock_action(instrument_key: str, *, reason: str) -> None:
    """Lock today's SGE + COMEX OHLC into daily_ohlc.

    Idempotent (INSERT OR IGNORE), so cold-start firing is safe and matches
    the pattern of `_daily_action` / `_verify_action`. Errors are logged
    but never raised because the verifier (slightly later) is the next downstream
    consumer and shouldn't be blocked by a transient akshare hiccup.
    """
    target = _now_beijing().strftime("%Y-%m-%d")
    with use_instrument(instrument_key):
        result = await asyncio.to_thread(lock_daily_ohlc, target)
    logger.info(
        "lock(%s, %s) date=%s inserted=%s skipped=%s errors=%s",
        instrument_key, reason,
        result.get("date"),
        result.get("inserted"),
        result.get("skipped"),
        result.get("errors"),
    )


async def _verify_action(instrument_key: str, *, reason: str) -> None:
    """Catch up on any unverified predictions from the last 7 days for this asset.

    Idempotent: `verify_prediction` short-circuits if already verified or if
    the next-day anchor is unavailable (weekend, network glitch, etc).
    Running it on a sliding window guarantees Friday's prediction eventually
    gets compared against Monday's close.
    """
    now = _now_beijing()
    with use_instrument(instrument_key):
        for days_back in range(1, 8):
            target = (now - timedelta(days=days_back)).strftime("%Y-%m-%d")
            refreshed = await asyncio.to_thread(verify_prediction, target)
            if refreshed and refreshed.verified_correct is not None and refreshed.verified_at is not None:
                from datetime import datetime as _dt
                try:
                    stamp = _dt.strptime(refreshed.verified_at, "%Y-%m-%d %H:%M:%S")
                    fresh = (datetime.now() - stamp).total_seconds() < 300
                except (ValueError, TypeError):
                    fresh = False
                if fresh:
                    payload = refreshed.model_dump(mode="json")
                    payload["asset"] = instrument_key
                    await event_hub.publish("prediction_verified", payload)
                    logger.info(
                        "verify(%s, %s) date=%s correct=%s",
                        instrument_key, reason,
                        target, refreshed.verified_correct,
                    )


def _resolve_backup_dir() -> Path:
    """Settings override (BACKUP_DIR) wins; default = <db>.parent/backups."""
    if settings.backup_dir:
        return Path(settings.backup_dir).expanduser().resolve()
    return current_db_path().parent / "backups"


async def _backup_action(instrument_key: str, *, reason: str) -> None:
    """Hot-copy current_db_path() into the backup directory + prune old files.

    Cold-start dedup: if today's backup already exists for this instrument,
    skip — we don't want a server restart loop to flood the backup directory.
    """
    with use_instrument(instrument_key):
        backup_dir = _resolve_backup_dir() / instrument_key
        today = _now_beijing().strftime("%Y-%m-%d")
        if reason == "cold-start" and latest_backup_date(backup_dir) == today:
            logger.info(
                "backup(%s): today's snapshot already exists, skip cold-start",
                instrument_key,
            )
            return
        try:
            path = await asyncio.to_thread(
                backup_database, backup_dir, source_db=current_db_path(),
            )
        except Exception:
            logger.exception("backup(%s, %s) failed", instrument_key, reason)
            return
        try:
            deleted = await asyncio.to_thread(
                rotate_backups, backup_dir, keep=settings.backup_keep,
            )
        except Exception:
            logger.exception("backup rotation failed for %s", instrument_key)
            deleted = []
        logger.info(
            "backup(%s, %s) ok path=%s pruned=%d",
            instrument_key, reason, path.name, len(deleted),
        )


def _bootstrap_instrument_db(instrument_key: str) -> None:
    """Ensure each instrument's SQLite file exists with the full schema."""
    with use_instrument(instrument_key):
        try:
            init_storage()
        except Exception:
            logger.exception("init_storage failed for %s", instrument_key)


def start_scheduler() -> None:
    """Register interval + daily + lock + verify + backup loops PER instrument.

    Each scheduled task wraps its work in ``use_instrument(key)`` so all
    downstream code (data fetch, DB read/write, prompt rendering) routes to
    the right asset.
    """
    global _tasks
    loop = asyncio.get_event_loop()
    _tasks = [t for t in _tasks if not t.done()]

    instruments = list_instruments()

    for instr in instruments:
        _bootstrap_instrument_db(instr.key)

    if not settings.scheduler_enabled:
        logger.info("Interval scheduler disabled via SCHEDULER_ENABLED=0")
    if not settings.scheduler_daily_enabled:
        logger.info("Daily scheduler disabled via SCHEDULER_DAILY_ENABLED=0")
    if not settings.backup_enabled:
        logger.info("Backup scheduler disabled via BACKUP_ENABLED=0")

    for instr in instruments:
        key = instr.key

        if settings.scheduler_enabled and instr.interval_analysis_enabled:
            task_name = f"interval:{key}"
            if not any(t.get_name() == task_name for t in _tasks):
                _tasks.append(loop.create_task(
                    _interval_loop(key), name=task_name,
                ))

        if settings.scheduler_daily_enabled:
            for cron_label, hour_min, action in (
                ("daily", instr.daily_cron_bj, _daily_action),
                ("lock", instr.lock_cron_bj, _lock_action),
                ("verify", instr.verify_cron_bj, _verify_action),
            ):
                task_name = f"{cron_label}:{key}"
                if any(t.get_name() == task_name for t in _tasks):
                    continue
                fire_time = dtime(*hour_min)
                bound = partial(action, key)
                _tasks.append(loop.create_task(
                    _wall_clock_loop(task_name, fire_time, bound),
                    name=task_name,
                ))

        if settings.backup_enabled:
            task_name = f"backup:{key}"
            if not any(t.get_name() == task_name for t in _tasks):
                fire_time = dtime(*instr.backup_cron_bj)
                bound = partial(_backup_action, key)
                _tasks.append(loop.create_task(
                    _wall_clock_loop(task_name, fire_time, bound),
                    name=task_name,
                ))


async def stop_scheduler() -> None:
    global _tasks
    for task in _tasks:
        if not task.done():
            task.cancel()
    for task in _tasks:
        try:
            await task
        except asyncio.CancelledError:
            pass
    _tasks = []
