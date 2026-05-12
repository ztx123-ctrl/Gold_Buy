"""Brent crude oil (布伦特原油) — sourced from huilvbiao's ``youjia/getoildata``
mirror, verified 2026-05-12 returning ``hf_OIL`` (Brent) and ``hf_CL`` (WTI).

Markets:
- ``ice`` — ICE Brent (USD/barrel). Primary close + realtime.
- ``comex`` — NYMEX WTI (USD/barrel) for cross-reference; not the headline.

We re-use the existing ``sge`` / ``comex`` slot naming inside ``MarketConfig`` is
intentionally avoided here: oil has no SGE leg, and we keep the ``technical_market``
field pointing at ``ice`` so technicals (ATR/RSI/MA20) compute from Brent's series.

Historical OHLC: ``ak.futures_foreign_hist(symbol=...)`` exposes a number of
oil tickers; the exact symbol that returns Brent on the deploy host is best
discovered at first run by ``scripts/scrape_historical_ohlc.py`` — left as
``"BR"`` here as a sensible akshare convention with documented fallback.
"""
from __future__ import annotations

from instruments.base import Instrument, MacroIndicator, MarketConfig, register


OIL = register(Instrument(
    key="oil",
    label_zh="原油（布伦特）",
    db_filename="oil_records.db",
    huilv_url="https://www.huilvbiao.com/youjia/getoildata",
    markets=(
        MarketConfig(
            id="ice",
            label="ICE Brent",
            unit="USD/桶",
            huilv_field="hf_OIL",
            akshare_symbol="BR",
        ),
        MarketConfig(
            id="comex",
            label="NYMEX WTI",
            unit="USD/桶",
            huilv_field="hf_CL",
            akshare_symbol="CL",
        ),
    ),
    news_keywords=("原油", "石油", "布伦特", "WTI", "OPEC"),
    macro_indicators=(
        MacroIndicator(
            id="dxy",
            series="DTWEXBGS",
            label="广义美元指数",
            # Oil is also USD-priced — DXY rise pressures price. Same sign as gold.
            correlation="negative",
        ),
        # Note: us10y_real correlation with oil is weak/regime-dependent and
        # intentionally omitted here. Phase-3+ additions: EIA crude inventory
        # weekly delta and OPEC announcements would be more predictive.
    ),
    prompt_module="prompts.daily_prompt_oil",
    # ICE Brent settles ~05:30 BJ (London 22:30 GMT in summer); 06:00 cron
    # gives upstream feed 30 min to refresh.
    daily_cron_bj=(6, 0),
    lock_cron_bj=(6, 15),
    verify_cron_bj=(6, 20),
    backup_cron_bj=(6, 50),
    # Oil moves more in continuous global trading; the 30-min interval analysis
    # has marginal value over the daily prediction. Disable to control LLM cost
    # — flip to True if you want intraday COMEX/Brent commentary.
    interval_analysis_enabled=False,
    # No SGE for oil — use ICE for technicals so atr14/rsi14/ma20 use Brent's series.
    technical_market="ice",
    realtime_market="ice",
))


__all__ = ("OIL",)
