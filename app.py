import asyncio
import json
import logging
import re
import threading
import time
from collections import deque
from contextlib import asynccontextmanager
from datetime import datetime
from pathlib import Path
from typing import Any

from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles

import uuid

from chains.broadcast import broadcast_manager
from chains.daily_runner import run_daily_prediction
from chains.events import hub as event_hub
from chains.hermes_chat import (
    build_greeting,
    build_system_message,
    get_runtime_status,
    stream_reply,
    summarize_session_title_async,
)
from chains.runner import run_gold_analysis_once
from chains.scheduler import start_scheduler, stop_scheduler
from chains.verifier import verify_prediction
from config import settings
from instruments import get_instrument, list_instruments, use_instrument
from schemas import BroadcastEvent
from storage.record_manager import (
    append_chat_message,
    archive_chat_session,
    compute_accuracy,
    compute_accuracy_v2,
    compute_calibration_buckets,
    compute_kpis,
    count_chat_messages,
    count_chat_sessions,
    create_chat_session,
    delete_record,
    get_all_records,
    get_chat_session,
    get_daily_prediction,
    get_daily_predictions,
    get_dashboard_summary,
    get_latest_daily_prediction,
    get_latest_records,
    init_storage,
    list_chat_messages,
    list_chat_sessions,
    query_distribution,
    query_timeseries,
    update_chat_session_title,
)
from tools.gold_price import get_gold_price, get_market_snapshot
from tools.news import get_gold_news


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Bootstrap each instrument's DB schema once at startup so the very first
    # request (which may target a non-default asset) doesn't race against
    # CREATE TABLE.
    for _instr in list_instruments():
        with use_instrument(_instr.key):
            init_storage()
    start_scheduler()
    try:
        yield
    finally:
        await stop_scheduler()


app = FastAPI(title="Aurum · Commodity Forecast", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ----- Asset routing middleware -----------------------------------------------
#
# All ``/api/*`` requests honour ``?asset=<key>`` query param OR ``X-Aurum-Asset``
# header; default is ``gold``. The middleware validates the key against the
# instrument registry (404 on unknown) and wraps downstream handlers in
# ``use_instrument(key)`` so every tool/storage call routes to the right DB.

_DEFAULT_ASSET = "gold"
_ASSET_ALLOWED_PATHS = ("/api/",)


def _resolve_asset(request: Request) -> str:
    asset = (
        request.query_params.get("asset")
        or request.headers.get("X-Aurum-Asset")
        or _DEFAULT_ASSET
    ).strip()
    return asset or _DEFAULT_ASSET


@app.middleware("http")
async def asset_context_middleware(request: Request, call_next):
    # Skip non-API paths (the SPA index.html itself doesn't need an asset).
    if not any(request.url.path.startswith(p) for p in _ASSET_ALLOWED_PATHS):
        return await call_next(request)
    asset = _resolve_asset(request)
    try:
        get_instrument(asset)
    except KeyError:
        return JSONResponse(
            {"success": False, "data": None, "error": f"未知资产 {asset!r}"},
            status_code=404,
        )
    with use_instrument(asset):
        response = await call_next(request)
    # Echo the resolved asset back so the client can verify routing.
    response.headers["X-Aurum-Resolved-Asset"] = asset
    return response

BASE_DIR = Path(__file__).resolve().parent
SPA_DIR = BASE_DIR / "static_dist"

if SPA_DIR.exists():
    app.mount("/static", StaticFiles(directory=SPA_DIR), name="spa_assets")


# SSE event hub now lives in chains/events.py (shared with scheduler/runners).


def success_response(data):
    return {"success": True, "data": data, "error": None}


def error_response(message: str, *, status_code: int | None = None):
    body = {"success": False, "data": None, "error": message}
    if status_code:
        return JSONResponse(content=body, status_code=status_code)
    return body


def _serve_spa() -> FileResponse:
    spa_index = SPA_DIR / "index.html"
    if spa_index.exists():
        return FileResponse(spa_index)
    raise HTTPException(status_code=404, detail="UI not built. Run `npm run build` in frontend/.")


_LOCAL_HOSTS = {"127.0.0.1", "::1", "localhost", "testclient"}


def _check_admin(request: Request) -> None:
    expected = settings.admin_token
    if not expected:
        raise HTTPException(status_code=403, detail="管理员通道未启用")
    provided = request.headers.get("X-Admin-Token") or request.query_params.get("admin_token")
    if provided != expected:
        raise HTTPException(status_code=401, detail="管理员鉴权失败")


def _check_admin_or_local(request: Request) -> None:
    """Allow either an admin-token request OR localhost (for in-host scheduler/Hermes)."""
    client_host = request.client.host if request.client else ""
    if client_host in _LOCAL_HOSTS:
        return
    if not settings.admin_token:
        raise HTTPException(status_code=403, detail="该接口仅限管理员或本机调用，请配置 ADMIN_TOKEN")
    provided = request.headers.get("X-Admin-Token") or request.query_params.get("admin_token")
    if provided != settings.admin_token:
        raise HTTPException(status_code=401, detail="管理员鉴权失败")


# ----- Pages / SPA -------------------------------------------------------------

@app.get("/")
def home():
    return _serve_spa()


@app.get("/app/{path:path}")
def app_routes(path: str):
    """SPA catch-all for /app/* routes."""
    return _serve_spa()


@app.get("/records")
def records_legacy():
    return _serve_spa()


# ----- Asset discovery --------------------------------------------------------

@app.get("/api/assets")
def list_available_assets():
    """List registered instruments so the SPA can render an asset selector."""
    payload = [
        {
            "key": instr.key,
            "label_zh": instr.label_zh,
            "markets": [
                {"id": m.id, "label": m.label, "unit": m.unit}
                for m in instr.markets
            ],
            "interval_analysis_enabled": instr.interval_analysis_enabled,
        }
        for instr in list_instruments()
    ]
    return success_response({"default": _DEFAULT_ASSET, "items": payload})


# ----- Existing API endpoints --------------------------------------------------

@app.get("/api/price")
def read_gold_price():
    snapshot = get_market_snapshot()
    return success_response(snapshot)


@app.post("/api/analysis/run")
async def run_analysis():
    try:
        record = await asyncio.to_thread(run_gold_analysis_once)
        await event_hub.publish("analysis_record_added", record.model_dump(mode="json"))
        return success_response(record.model_dump(mode="json"))
    except Exception:
        logger.exception("Analysis request failed")
        return error_response("分析执行失败，请稍后再试")


@app.get("/api/records")
def read_records():
    return success_response([record.model_dump(mode="json") for record in get_all_records()])


@app.get("/api/records/latest")
def read_latest_records(n: int = 20):
    return success_response([record.model_dump(mode="json") for record in get_latest_records(n)])


@app.delete("/api/records/{record_id}")
def remove_record(record_id: str, request: Request):
    _check_admin_or_local(request)
    success, message = delete_record(record_id)
    if success:
        return success_response({"message": message})
    return error_response(message)


@app.get("/api/dashboard/summary")
def read_dashboard_summary(limit: int = 24):
    return success_response(get_dashboard_summary(limit).model_dump(mode="json"))


@app.get("/api/analytics/timeseries")
def read_analytics_timeseries(range: str = Query("24h")):
    resolved, points = query_timeseries(range)
    return success_response({
        "range": resolved,
        "points": [point.model_dump(mode="json") for point in points],
    })


@app.get("/api/analytics/distribution")
def read_analytics_distribution(range: str = Query("24h")):
    resolved, snapshot = query_distribution(range)
    payload = snapshot.model_dump(mode="json")
    payload["range"] = resolved
    return success_response(payload)


@app.get("/api/analytics/kpis")
def read_analytics_kpis(range: str = Query("24h")):
    return success_response(compute_kpis(range).model_dump(mode="json"))


# ----- New: predictions --------------------------------------------------------

@app.post("/api/predictions/daily/run")
async def post_predictions_run(date: str | None = Query(None)):
    """Idempotent — overwrites the same-day row. Public so the SPA can trigger it."""
    target = date or datetime.now().strftime("%Y-%m-%d")
    try:
        prediction = await asyncio.to_thread(run_daily_prediction, target)
        payload = prediction.model_dump(mode="json")
        await event_hub.publish("daily_prediction_ready", payload)
        return success_response(payload)
    except Exception:
        logger.exception("daily prediction run failed")
        return error_response("每日预测执行失败，请稍后再试")


@app.post("/api/predictions/daily/verify")
async def post_predictions_verify(date: str | None = Query(None)):
    """Idempotent — only writes if actual close differs from anchor."""
    target = date or datetime.now().strftime("%Y-%m-%d")
    refreshed = await asyncio.to_thread(verify_prediction, target)
    if refreshed is None:
        return error_response("未找到该日期的预测记录")
    if refreshed.verified_correct is None:
        return success_response({"prediction": refreshed.model_dump(mode="json"), "verified": False})
    await event_hub.publish("prediction_verified", refreshed.model_dump(mode="json"))
    return success_response({"prediction": refreshed.model_dump(mode="json"), "verified": True})


@app.get("/api/predictions/today")
def get_today_prediction():
    today = datetime.now().strftime("%Y-%m-%d")
    today_pred = get_daily_prediction(today)
    fallback = get_latest_daily_prediction() if today_pred is None else None
    prediction = today_pred or fallback
    if prediction is None:
        return success_response(None)
    payload = prediction.model_dump(mode="json")
    payload["is_today"] = (today_pred is not None)
    return success_response(payload)


@app.get("/api/predictions/daily")
def list_daily_predictions(range: str = Query("30d")):
    window_map = {"7d": 7, "30d": 30, "90d": 90, "all": None}
    days = window_map.get(range, 30)
    predictions = get_daily_predictions(days)
    return success_response({
        "range": range if range in window_map else "30d",
        "items": [p.model_dump(mode="json") for p in predictions],
    })


@app.get("/api/predictions/accuracy")
def get_accuracy(window: str = Query("30d")):
    return success_response(compute_accuracy(window).model_dump(mode="json"))


@app.get("/api/predictions/calibration")
def get_calibration(window: str = Query("30d"), buckets: int = Query(5)):
    return success_response([
        b.model_dump(mode="json") for b in compute_calibration_buckets(window, n_buckets=max(2, min(10, buckets)))
    ])


@app.get("/api/predictions/metrics/detailed")
def get_metrics_detailed(
    window: str = Query("30d"),
    include_reconstructed: bool = Query(False),
    include_synthetic: bool = Query(False),
    include_synthetic_v1: bool = Query(False),
    include_raw: bool = Query(False),
):
    return success_response(
        compute_accuracy_v2(
            window,
            include_reconstructed=include_reconstructed,
            include_synthetic=include_synthetic,
            include_synthetic_v1=include_synthetic_v1,
            include_raw=include_raw,
        ).model_dump(mode="json")
    )


@app.post("/api/predictions/inbox")
async def predictions_inbox(request: Request):
    """Receive supplementary commentary from external agents (e.g., Hermes).

    Allowed sources:
    - localhost (127.0.0.1 / ::1) — for the on-host Hermes skill
    - any caller carrying a valid X-Admin-Token (when ADMIN_TOKEN is configured)
    """
    client_host = request.client.host if request.client else ""
    is_local = client_host in _LOCAL_HOSTS
    has_admin = bool(settings.admin_token) and (
        request.headers.get("X-Admin-Token") == settings.admin_token
    )
    if not (is_local or has_admin):
        raise HTTPException(status_code=403, detail="inbox 仅限本机或管理员")

    try:
        payload = await request.json()
    except Exception:
        return error_response("请求体不是合法 JSON", status_code=400)
    note = str(payload.get("note", "")).strip()
    prediction_date = str(payload.get("prediction_date", "")).strip()
    if not (note and prediction_date):
        return error_response("缺少 note 或 prediction_date", status_code=400)
    target = get_daily_prediction(prediction_date)
    if target is None:
        return error_response("未找到该日期的预测", status_code=404)
    appended = (target.calibration_note + "\n[外部评论] " + note).strip()
    target.calibration_note = appended[:2000]
    from storage.record_manager import save_daily_prediction
    save_daily_prediction(target)
    await event_hub.publish("prediction_commentary", target.model_dump(mode="json"))
    return success_response({"prediction_date": prediction_date, "appended": True})


# ----- Notifications -----------------------------------------------------------

@app.get("/api/notifications/channels")
def list_channels():
    return success_response({
        "configured": broadcast_manager.configured_channels(),
        "available": [c.name for c in broadcast_manager.channels],
    })


@app.post("/api/notifications/test")
async def test_notification(request: Request):
    if not settings.allow_test_notify:
        raise HTTPException(status_code=403, detail="测试推送未开启")
    _check_admin(request)
    event = BroadcastEvent(
        type="test",
        title="Aurum · 测试推送",
        body="如果你看到这条消息，说明推送通道已成功打通。",
        payload={"sent_at": datetime.now().isoformat(timespec="seconds")},
    )
    results = await broadcast_manager.dispatch_async(event)
    return success_response({"results": results})


# ----- Hermes chat ------------------------------------------------------------

CHAT_MAX_INPUT_LEN = 4000
CHAT_MAX_MESSAGES_PER_SESSION = 200
CHAT_MAX_SESSIONS_PER_CLIENT = 50
CHAT_RATE_LIMIT_WINDOW_SECONDS = 300
CHAT_RATE_LIMIT_COUNT = 30

# Shape: UUID v4 (with dashes) and the legacy `c_<base36>_..._...` fallback
# emitted by the frontend both fit ^[A-Za-z0-9_-]{16,128}$. Anything shorter
# is too brute-forceable; anything with other characters is almost certainly
# spoofed or malformed.
_CLIENT_ID_RE = re.compile(r"^[A-Za-z0-9_-]{16,128}$")

_chat_rate_buckets: dict[str, deque[float]] = {}
_chat_rate_lock = threading.Lock()


def _validate_client_id(client_id: str | None) -> str:
    if not client_id:
        raise HTTPException(status_code=400, detail="缺少 client_id")
    cleaned = client_id.strip()
    if not _CLIENT_ID_RE.match(cleaned):
        raise HTTPException(status_code=400, detail="client_id 格式无效（需 16-128 位字母数字/下划线/短横线）")
    return cleaned


def _check_chat_rate(client_id: str) -> None:
    """Sliding-window rate limit. Raises 429 if exceeded.

    Buckets live in-process — fine because deployment is single-instance
    (README enforces uvicorn --workers 1). Empty buckets are evicted to keep
    memory bounded if many unique clients ever connect.
    """
    now = time.time()
    cutoff = now - CHAT_RATE_LIMIT_WINDOW_SECONDS
    with _chat_rate_lock:
        bucket = _chat_rate_buckets.get(client_id)
        if bucket is None:
            bucket = deque()
            _chat_rate_buckets[client_id] = bucket
        while bucket and bucket[0] < cutoff:
            bucket.popleft()
        if len(bucket) >= CHAT_RATE_LIMIT_COUNT:
            retry_after = max(1, int(bucket[0] + CHAT_RATE_LIMIT_WINDOW_SECONDS - now))
            raise HTTPException(
                status_code=429,
                detail=f"请求过于频繁，请 {retry_after}s 后重试",
                headers={"Retry-After": str(retry_after)},
            )
        bucket.append(now)
        if not bucket:
            _chat_rate_buckets.pop(client_id, None)


def _resolve_client_id(request: Request, query_value: str | None) -> str:
    """Prefer X-Aurum-Client-Id header (kept out of access logs); fall back to query."""
    header_value = request.headers.get("X-Aurum-Client-Id")
    candidate = (header_value or query_value or "").strip()
    return _validate_client_id(candidate)


def _ensure_session_owned(session_id: str, client_id: str):
    session = get_chat_session(session_id, client_id)
    if session is None:
        raise HTTPException(status_code=404, detail="会话不存在或不属于该 client")
    return session


@app.get("/api/chat/sessions")
def chat_list_sessions(request: Request, client_id: str | None = Query(default=None, max_length=128)):
    cid = _resolve_client_id(request, client_id)
    return success_response([s.model_dump(mode="json") for s in list_chat_sessions(cid)])


@app.post("/api/chat/sessions")
async def chat_create_session(request: Request):
    try:
        body = await request.json()
    except Exception:
        body = {}
    body_cid = body.get("client_id") if isinstance(body, dict) else None
    cid = _resolve_client_id(request, body_cid)
    if count_chat_sessions(cid) >= CHAT_MAX_SESSIONS_PER_CLIENT:
        raise HTTPException(
            status_code=409,
            detail=f"会话总数已达上限（{CHAT_MAX_SESSIONS_PER_CLIENT}）",
        )
    title = (body.get("title") if isinstance(body, dict) else None) or "新对话"
    session_id = str(uuid.uuid4())
    session = create_chat_session(session_id, cid, str(title)[:64])
    return success_response(session.model_dump(mode="json"))


@app.delete("/api/chat/sessions/{session_id}")
def chat_delete_session(session_id: str, request: Request, client_id: str | None = Query(default=None, max_length=128)):
    cid = _resolve_client_id(request, client_id)
    if archive_chat_session(session_id, cid):
        return success_response({"archived": True, "session_id": session_id})
    return error_response("会话不存在或不属于该 client", status_code=404)


@app.get("/api/chat/sessions/{session_id}/messages")
def chat_list_messages(session_id: str, request: Request, client_id: str | None = Query(default=None, max_length=128)):
    cid = _resolve_client_id(request, client_id)
    _ensure_session_owned(session_id, cid)
    return success_response([m.model_dump(mode="json") for m in list_chat_messages(session_id, cid)])


async def _gather_chat_context() -> tuple[dict, "DailyPrediction | None", dict, list[dict]]:
    """Pull market snapshot + latest prediction + accuracy + news without blocking the event loop.

    Each underlying call wraps either requests.get() or sqlite — all sync — so we
    push them to worker threads and gather concurrently.
    """
    market_t = asyncio.to_thread(get_market_snapshot)
    pred_t = asyncio.to_thread(get_latest_daily_prediction)
    acc_t = asyncio.to_thread(compute_accuracy, "30d")
    news_t = asyncio.to_thread(get_gold_news, 5)
    market, prediction, accuracy_obj, news_items = await asyncio.gather(
        market_t, pred_t, acc_t, news_t,
    )
    accuracy = accuracy_obj.model_dump(mode="json")
    news = [n.model_dump(mode="json") for n in (news_items or [])]
    return market, prediction, accuracy, news


@app.get("/api/chat/runtime")
async def chat_runtime():
    return success_response(await get_runtime_status())


@app.get("/api/chat/greeting")
async def chat_greeting():
    market, prediction, accuracy, news = await _gather_chat_context()
    greeting = build_greeting(market=market, prediction=prediction, accuracy=accuracy, news=news)
    return success_response(greeting.model_dump(mode="json"))


@app.post("/api/chat/sessions/{session_id}/message")
async def chat_post_message(
    session_id: str,
    request: Request,
    client_id: str | None = Query(default=None, max_length=128),
):
    from fastapi.responses import StreamingResponse
    from schemas import ChatRole

    cid = _resolve_client_id(request, client_id)
    session = _ensure_session_owned(session_id, cid)
    _check_chat_rate(cid)

    if count_chat_messages(session_id) >= CHAT_MAX_MESSAGES_PER_SESSION:
        raise HTTPException(status_code=409, detail="该会话已达消息上限，请新建对话")

    try:
        body = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="请求体不是合法 JSON")
    content_raw = (body or {}).get("content")
    if not isinstance(content_raw, str):
        raise HTTPException(status_code=400, detail="content 必须是字符串")
    content = content_raw.strip()
    if not content:
        raise HTTPException(status_code=400, detail="消息内容为空")
    if len(content) > CHAT_MAX_INPUT_LEN:
        raise HTTPException(status_code=413, detail=f"消息超过 {CHAT_MAX_INPUT_LEN} 字符上限")

    history = await asyncio.to_thread(
        list_chat_messages, session_id, cid, CHAT_MAX_MESSAGES_PER_SESSION
    )
    is_first_message = session.message_count == 0

    user_msg = await asyncio.to_thread(
        append_chat_message,
        message_id=str(uuid.uuid4()),
        session_id=session_id,
        role=ChatRole.USER,
        content=content,
    )

    market, prediction, accuracy, news = await _gather_chat_context()
    prediction_dump = prediction.model_dump(mode="json") if prediction else None
    system_text = build_system_message(
        market=market, prediction=prediction_dump, accuracy=accuracy, news=news,
    )

    accumulator: list[str] = []

    async def streamer():
        try:
            async for chunk in stream_reply(
                system_text=system_text,
                history=history,
                user_input=content,
                session_id=session_id,
                client_id=cid,
            ):
                accumulator.append(chunk)
                yield chunk
        except (asyncio.CancelledError, GeneratorExit):
            raise
        except Exception:
            logger.exception("chat stream failed mid-flight")
            tail = "（连接异常，部分内容已截断）"
            accumulator.append(tail)
            yield tail
        finally:
            full_reply = "".join(accumulator).strip()
            if not full_reply:
                full_reply = "（暂无回复）"
            try:
                await asyncio.to_thread(
                    append_chat_message,
                    message_id=str(uuid.uuid4()),
                    session_id=session_id,
                    role=ChatRole.ASSISTANT,
                    content=full_reply,
                )
                if is_first_message:
                    title = await summarize_session_title_async(content)
                    await asyncio.to_thread(
                        update_chat_session_title, session_id, cid, title,
                    )
            except Exception:
                logger.exception("chat persistence failed")

    return StreamingResponse(
        streamer(),
        media_type="text/plain; charset=utf-8",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
            "X-Aurum-User-Message-Id": user_msg.id,
        },
    )


# ----- SSE stream --------------------------------------------------------------

@app.get("/api/stream")
async def stream(request: Request):
    queue = await event_hub.subscribe()

    async def event_source():
        try:
            yield f": connected at {datetime.now().isoformat(timespec='seconds')}\n\n"
            while True:
                if await request.is_disconnected():
                    break
                try:
                    message = await asyncio.wait_for(queue.get(), timeout=20)
                    yield f"event: {message['type']}\n" \
                          f"data: {json.dumps(message['payload'], ensure_ascii=False)}\n\n"
                except asyncio.TimeoutError:
                    yield ": keepalive\n\n"
        finally:
            await event_hub.unsubscribe(queue)

    from fastapi.responses import StreamingResponse
    return StreamingResponse(
        event_source(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )
