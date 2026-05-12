from __future__ import annotations

import logging
from datetime import datetime, timedelta

from chains.broadcast import broadcast_manager
from schemas import BroadcastEvent, CloseSourceStatus, DailyPrediction, Trend
from storage.record_manager import (
    get_daily_prediction,
    get_records_for_date,
    update_daily_outcome,
    update_record_outcome,
)
from tools.gold_close import fetch_dual_close, fetch_dual_close_from_ohlc


logger = logging.getLogger(__name__)


def _direction_from_close(anchor_close: float, actual_close: float) -> Trend:
    delta = actual_close - anchor_close
    threshold = max(anchor_close * 0.0015, 0.5)
    if delta > threshold:
        return Trend.UP
    if delta < -threshold:
        return Trend.DOWN
    return Trend.FLAT


def verify_prediction(
    prediction_date: str,
    *,
    historical_mode: bool = False,
) -> DailyPrediction | None:
    """Verify the daily prediction made for `prediction_date` using the next-day close.

    Same-source comparison is mandatory: SGE (CNY/g) and COMEX (USD/oz) live in
    different units — comparing across markets would silently corrupt direction.

    historical_mode=True: pull next-day close from the locked daily_ohlc table
    instead of the live feed. Used by the backtest pipeline.
    """
    prediction = get_daily_prediction(prediction_date)
    if prediction is None:
        logger.info("verify: no prediction for %s", prediction_date)
        return None
    if prediction.verified_correct is not None:
        return prediction

    next_dt = datetime.strptime(prediction_date, "%Y-%m-%d") + timedelta(days=1)
    # Walk past weekends so Friday's prediction can be checked against Monday's close.
    while next_dt.weekday() >= 5:
        next_dt += timedelta(days=1)
    next_day = next_dt.strftime("%Y-%m-%d")

    # If we still are before the actual trading day completion, the upstream feed
    # will return the same value as the anchor — guarded below by the byte-equal check.
    if historical_mode:
        sge, comex, status = fetch_dual_close_from_ohlc(next_day)
    else:
        sge, comex, status = fetch_dual_close(next_day)

    anchor_close: float | None = None
    actual_close: float | None = None
    if prediction.today_close_sge is not None and sge is not None:
        anchor_close = prediction.today_close_sge
        actual_close = sge
    elif prediction.today_close_comex is not None and comex is not None:
        anchor_close = prediction.today_close_comex
        actual_close = comex

    if anchor_close is None or actual_close is None:
        logger.info(
            "verify: same-source pair missing for %s (anchor sge=%s comex=%s, actual sge=%s comex=%s)",
            prediction_date,
            prediction.today_close_sge,
            prediction.today_close_comex,
            sge,
            comex,
        )
        return prediction

    # If the "next-day" quote is byte-identical to the anchor, the markets
    # haven't moved (or haven't reopened) — refuse to verify.
    if abs(actual_close - anchor_close) < 1e-6:
        logger.info(
            "verify: next-day quote unchanged from anchor for %s; markets likely closed",
            prediction_date,
        )
        return prediction

    actual_direction = _direction_from_close(anchor_close, actual_close)
    correct = prediction.tomorrow_direction == actual_direction

    update_daily_outcome(prediction_date, actual_close, actual_direction, correct)

    # Phase 1: per-row metrics — best-effort, never blocks verification main flow
    try:
        from chains.metrics import brier_multiclass, log_loss as compute_log_loss
        from chains.regime import classify_regime
        from storage.record_manager import update_daily_metrics

        refreshed_pred = get_daily_prediction(prediction_date)
        if refreshed_pred is not None:
            brier = brier_multiclass(
                refreshed_pred.prob_up,
                refreshed_pred.prob_down,
                refreshed_pred.prob_flat,
                actual_direction,
            )
            ll = compute_log_loss(
                refreshed_pred.prob_up,
                refreshed_pred.prob_down,
                refreshed_pred.prob_flat,
                actual_direction,
            )
            regime = classify_regime(prediction_date)
            update_daily_metrics(prediction_date, brier=brier, log_loss=ll, regime=regime)
    except Exception:
        logger.exception("phase1 per-row metrics persist failed")

    # Mirror onto analysis_records that targeted the same date
    for record in get_records_for_date(prediction_date):
        update_record_outcome(record.id, actual_close, actual_direction, record.trend == actual_direction)

    refreshed = get_daily_prediction(prediction_date)
    try:
        broadcast_manager.dispatch(BroadcastEvent(
            type="prediction_verified",
            title=f"Aurum · {prediction_date} 预测已校验",
            body=(
                f"预测方向 {prediction.tomorrow_direction.value}，"
                f"实际方向 {actual_direction.value}，"
                f"结果：{'命中' if correct else '未中'}（实际收盘 {actual_close}）"
            ),
            payload={
                "prediction_date": prediction_date,
                "predicted": prediction.tomorrow_direction.value,
                "actual": actual_direction.value,
                "correct": correct,
                "actual_close": actual_close,
            },
        ))
    except Exception:
        logger.exception("verify broadcast failed")
    return refreshed
