"""Silver (白银) — 沪银 Ag(T+D) + COMEX SI.

Realtime + close are served by the dedicated ``silver_indexApi`` mirror on
huilvbiao (verified 2026-05-12). SGE silver is quoted in **CNY/kg**, distinct
from gold's CNY/g — display layers must respect ``MarketConfig.unit``.

Macro signals reuse gold's DXY + US10Y real-yield, with industrial PMI a
plausible Phase 3+ addition for silver's industrial demand component.
"""
from __future__ import annotations

from instruments.base import Instrument, MacroIndicator, MarketConfig, register


SILVER = register(Instrument(
    key="silver",
    label_zh="白银",
    db_filename="silver_records.db",
    huilv_url="https://www.huilvbiao.com/api/silver_indexApi",
    markets=(
        MarketConfig(
            id="sge",
            label="SGE Ag(T+D)",
            unit="CNY/kg",
            huilv_field="gds_AGTD",
            akshare_symbol="Ag(T+D)",
        ),
        MarketConfig(
            id="comex",
            label="COMEX SI",
            unit="USD/oz",
            huilv_field="hf_SI",
            akshare_symbol="SI",
        ),
    ),
    news_keywords=("白银", "银价", "贵金属"),
    macro_indicators=(
        MacroIndicator(
            id="dxy",
            series="DTWEXBGS",
            label="广义美元指数",
            correlation="negative",
        ),
        MacroIndicator(
            id="us10y_real",
            series="DFII10",
            label="10Y 实际收益",
            correlation="negative",
            unit="%",
        ),
    ),
    prompt_module="prompts.daily_prompt_silver",
    # Aligned with gold (沪银夜盘也在 02:30 收) but shifted 5 min later to
    # avoid scheduler write contention with the gold cron.
    daily_cron_bj=(2, 55),
    lock_cron_bj=(3, 10),
    verify_cron_bj=(3, 15),
    backup_cron_bj=(4, 5),
    interval_analysis_enabled=True,
    technical_market="sge",
    realtime_market="comex",
))


__all__ = ("SILVER",)
