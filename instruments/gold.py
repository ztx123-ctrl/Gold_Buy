"""Gold (黄金) — the historical default instrument.

Values here mirror the previously-hardcoded constants in tools/gold_price.py,
tools/gold_close.py, tools/gold_history.py, tools/news.py, prompts/daily_prompt.py
and chains/scheduler.py. Refactored callers read these via current_instrument()
instead of repeating the literal strings.
"""
from __future__ import annotations

from instruments.base import Instrument, MacroIndicator, MarketConfig, register


GOLD = register(Instrument(
    key="gold",
    label_zh="黄金",
    db_filename="gold_records.db",
    huilv_url="https://www.huilvbiao.com/api/gold_indexApi",
    markets=(
        MarketConfig(
            id="sge",
            label="SGE Au(T+D)",
            unit="CNY/g",
            huilv_field="gds_AUTD",
            akshare_symbol="Au(T+D)",
        ),
        MarketConfig(
            id="comex",
            label="COMEX GC",
            unit="USD/oz",
            huilv_field="hf_GC",
            akshare_symbol="GC",
        ),
    ),
    news_keywords=("黄金", "金价", "贵金属"),
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
    prompt_module="prompts.daily_prompt",
    daily_cron_bj=(2, 50),
    lock_cron_bj=(3, 5),
    verify_cron_bj=(3, 10),
    backup_cron_bj=(4, 0),
    interval_analysis_enabled=True,
    technical_market="sge",
    realtime_market="comex",
))


__all__ = ("GOLD",)
