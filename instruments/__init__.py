"""Instrument registry — import this package and ``current_instrument()`` to
read per-asset configuration anywhere in the codebase.

Side effect: importing this module registers all known instruments. Add new
assets by creating ``instruments/<key>.py`` and importing it here.
"""
from instruments.base import (
    BASE_DIR,
    Instrument,
    MacroIndicator,
    MarketConfig,
    current_db_path,
    current_instrument,
    get_instrument,
    list_instruments,
    register,
    use_instrument,
)
from instruments import gold  # noqa: F401 — side-effect: register the gold instrument
from instruments import silver  # noqa: F401 — register silver
from instruments import oil  # noqa: F401 — register oil (Brent)


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
