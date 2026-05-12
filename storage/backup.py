"""SQLite hot backups via the official Connection.backup() API.

Using ``cp gold_records.db backup.db`` is unsafe under concurrent writes — the
file can be mid-transaction and the copy ends up torn. SQLite's backup API
copies pages with a brief shared lock at the page level, so even an actively
written DB produces a consistent snapshot.

Naming: ``gold_records-YYYY-MM-DD_HHMMSS.db``. Multiple backups per day are fine
(they'll have different timestamps); the rotation policy keeps the N newest
files by mtime regardless of date.
"""
from __future__ import annotations

import logging
import re
import sqlite3
from contextlib import closing
from datetime import datetime
from pathlib import Path


logger = logging.getLogger(__name__)


# Backup filename layout: ``<source-stem>-YYYY-MM-DD_HHMMSS.db``. ``<source-stem>``
# is just the source DB's filename minus ``.db`` (e.g. ``gold_records`` for the
# gold instrument, ``silver_records`` for silver), so per-instrument backups
# in the same directory don't collide even when scheduled per-asset subdirs
# are not in use.
_BACKUP_FILENAME_RE = re.compile(
    r"^(?P<prefix>[A-Za-z0-9_]+)-(?P<date>\d{4}-\d{2}-\d{2})_\d{6}\.db$"
)


def _format_timestamp(now: datetime) -> str:
    return now.strftime("%Y-%m-%d_%H%M%S")


def backup_database(
    backup_dir: Path,
    *,
    source_db: Path,
    now: datetime | None = None,
) -> Path:
    """Create a hot backup of ``source_db`` into ``backup_dir``.

    Returns the target Path. Raises ``FileNotFoundError`` if the source DB
    doesn't exist; that's deliberate — a missing source is an actionable error,
    not something to silently swallow.
    """
    if not source_db.exists():
        raise FileNotFoundError(f"source DB does not exist: {source_db}")
    backup_dir.mkdir(parents=True, exist_ok=True)
    stamp = _format_timestamp(now or datetime.now())
    target = backup_dir / f"{source_db.stem}-{stamp}.db"

    with closing(sqlite3.connect(source_db)) as src, closing(sqlite3.connect(target)) as dst:
        src.backup(dst)
    logger.info("sqlite backup written: %s", target)
    return target


def list_backups(backup_dir: Path) -> list[Path]:
    """Return existing backup files sorted newest-first by mtime.

    Files that don't match the expected name pattern are ignored so a stray
    manual copy in the same directory can't confuse rotation.
    """
    if not backup_dir.exists():
        return []
    candidates = [
        p for p in backup_dir.iterdir()
        if p.is_file() and _BACKUP_FILENAME_RE.match(p.name)
    ]
    return sorted(candidates, key=lambda p: p.stat().st_mtime, reverse=True)


def rotate_backups(backup_dir: Path, *, keep: int) -> list[Path]:
    """Delete all but the ``keep`` newest backups. Returns the deleted paths.

    ``keep`` is clamped to at least 1 — never wipe the last surviving backup.
    """
    keep = max(1, int(keep))
    existing = list_backups(backup_dir)
    if len(existing) <= keep:
        return []
    to_delete = existing[keep:]
    deleted: list[Path] = []
    for path in to_delete:
        try:
            path.unlink()
            deleted.append(path)
        except OSError:
            logger.warning("failed to delete old backup: %s", path, exc_info=True)
    if deleted:
        logger.info("sqlite backup rotation removed %d file(s)", len(deleted))
    return deleted


def latest_backup_date(backup_dir: Path) -> str | None:
    """Return the YYYY-MM-DD of the newest backup, or None if there are none.

    Used by the scheduler cold-start path to skip same-day re-runs after a
    server restart.
    """
    existing = list_backups(backup_dir)
    if not existing:
        return None
    match = _BACKUP_FILENAME_RE.match(existing[0].name)
    if not match:
        return None
    return match.group("date")


__all__ = (
    "backup_database",
    "list_backups",
    "rotate_backups",
    "latest_backup_date",
)
