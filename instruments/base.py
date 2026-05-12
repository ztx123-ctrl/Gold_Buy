"""Instrument registry — single source of truth for per-asset configuration.

A tradable instrument (黄金/白银/原油 ...) is described by:
- Its huilvbiao realtime endpoint and the field names of each market quote
- The akshare symbols used to backfill historical OHLC
- The macro indicators whose correlation with this commodity matters for the prompt
- News keywords used to filter the news scraper output
- Per-asset DB filename, prompt module, daily cron time

Code paths that were previously gold-hardcoded read from ``current_instrument()``
(a contextvar) instead, so the same function works for any registered asset
once a context is set via ``use_instrument(key)``. The default context is
``"gold"`` — this is what keeps the existing single-asset behaviour identical
when the registry is introduced without any consumer-side change.
"""
from __future__ import annotations

import contextlib
import contextvars
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Iterator


BASE_DIR = Path(__file__).resolve().parent.parent


@dataclass(frozen=True)
class MarketConfig:
    """One trading venue for an instrument.

    ``huilv_field`` is the JS variable name returned by the huilvbiao endpoint
    (e.g., ``gds_AUTD`` for SGE gold, ``hf_OIL`` for Brent). ``None`` means this
    venue is not available from the huilv mirror — the close has to come from
    akshare history or be unavailable.

    ``akshare_fetcher`` names the akshare function used to backfill historical
    OHLC for this market: ``spot_hist_sge`` for SGE spot tickers (Au/Ag T+D),
    ``futures_foreign_hist`` for international futures (GC, SI, BR, CL, ...).
    """
    id: str
    label: str
    unit: str
    huilv_field: str | None
    akshare_symbol: str | None
    akshare_fetcher: str = "futures_foreign_hist"


@dataclass(frozen=True)
class MacroIndicator:
    """A macro signal correlated with the instrument's direction."""
    id: str
    series: str            # FRED series id
    label: str
    correlation: str       # "negative" | "positive"
    unit: str = ""


@dataclass(frozen=True)
class Instrument:
    """A tradable commodity tracked by Aurum."""
    key: str
    label_zh: str
    db_filename: str
    huilv_url: str
    markets: tuple[MarketConfig, ...]
    news_keywords: tuple[str, ...]
    macro_indicators: tuple[MacroIndicator, ...]
    prompt_module: str
    daily_cron_bj: tuple[int, int]
    lock_cron_bj: tuple[int, int]
    verify_cron_bj: tuple[int, int]
    backup_cron_bj: tuple[int, int] = (4, 0)
    # If False, the 30-minute interval analysis loop is not registered for this
    # instrument — saves LLM cost for assets where only the daily prediction
    # matters. Daily/lock/verify/backup still run.
    interval_analysis_enabled: bool = True
    # Per-instrument technical-indicator source market id. Defaults to "sge" so
    # legacy gold paths (atr14, rsi14, regime, ...) keep using the SGE series.
    technical_market: str = "sge"
    realtime_market: str = "comex"
    extra: dict[str, object] = field(default_factory=dict)

    def market(self, market_id: str) -> MarketConfig | None:
        for m in self.markets:
            if m.id == market_id:
                return m
        return None

    @property
    def db_path(self) -> Path:
        return BASE_DIR / self.db_filename


_INSTRUMENTS: dict[str, Instrument] = {}
_current: contextvars.ContextVar[str] = contextvars.ContextVar(
    "current_instrument", default="gold"
)


def register(instrument: Instrument) -> Instrument:
    if instrument.key in _INSTRUMENTS:
        raise ValueError(f"instrument {instrument.key!r} already registered")
    _INSTRUMENTS[instrument.key] = instrument
    return instrument


def get_instrument(key: str) -> Instrument:
    try:
        return _INSTRUMENTS[key]
    except KeyError as exc:
        raise KeyError(
            f"unknown instrument {key!r}; registered={list(_INSTRUMENTS)}"
        ) from exc


def current_instrument() -> Instrument:
    return get_instrument(_current.get())


def list_instruments() -> list[Instrument]:
    return list(_INSTRUMENTS.values())


@contextlib.contextmanager
def use_instrument(key: str) -> Iterator[Instrument]:
    """Set the current instrument for the duration of the with-block.

    Raises ``KeyError`` if ``key`` is not registered. Restores the previous
    context on exit even if the body raises.
    """
    instrument = get_instrument(key)
    token = _current.set(key)
    try:
        yield instrument
    finally:
        _current.reset(token)


def current_db_path() -> Path:
    """Resolve the SQLite path for the current instrument context.

    Precedence:
    1. A ``DB_PATH`` attribute set on ``storage.record_manager`` (test override) —
       legacy tests assign there to redirect storage at a temp file. We honor it
       so test suites don't need a sweeping rewrite.
    2. ``current_instrument().db_path`` — the production path.

    Looking at ``__dict__`` directly (rather than ``getattr``) so we only react
    to **explicit assignment**, not to the module-level ``__getattr__`` shim
    that record_manager itself installs to resolve ``DB_PATH`` dynamically.
    """
    rm_module = sys.modules.get("storage.record_manager")
    if rm_module is not None:
        override = rm_module.__dict__.get("DB_PATH")
        if override is not None:
            return Path(override)
    return current_instrument().db_path


__all__ = (
    "BASE_DIR",
    "Instrument",
    "MacroIndicator",
    "MarketConfig",
    "current_db_path",
    "current_instrument",
    "get_instrument",
    "list_instruments",
    "register",
    "use_instrument",
)
