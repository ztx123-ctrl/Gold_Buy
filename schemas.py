from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import Any

from pydantic import BaseModel, Field, field_validator


class Trend(str, Enum):
    UP = "上涨"
    DOWN = "下跌"
    FLAT = "震荡"
    UNKNOWN = "未知"


class AnalysisStatus(str, Enum):
    SUCCESS = "success"
    PARTIAL = "partial"
    FAILED = "failed"


class NewsItem(BaseModel):
    title: str
    link: str | None = None
    source: str = "unknown"
    published_at: str | None = None


class AnalysisInput(BaseModel):
    price_raw: str = "N/A"
    price_value: float | None = None
    news: list[NewsItem] = Field(default_factory=list)
    source: str = "manual"
    generated_at: datetime = Field(default_factory=datetime.now)


class AnalysisLLMOutput(BaseModel):
    summary: str = "暂无总结"
    trend: Trend = Trend.UNKNOWN
    reasons: list[str] = Field(default_factory=list)
    advice: str = "暂无建议"

    @field_validator("summary", "advice", mode="before")
    @classmethod
    def normalize_text(cls, value: Any) -> str:
        return str(value or "").strip()

    @field_validator("reasons", mode="before")
    @classmethod
    def normalize_reasons(cls, value: Any) -> list[str]:
        if value is None:
            return []
        if isinstance(value, str):
            return [item.strip("- ").strip() for item in value.splitlines() if item.strip()][:3]
        return [str(item).strip() for item in value if str(item).strip()][:3]


class AnalysisRecord(BaseModel):
    id: str
    time: str
    source: str
    status: AnalysisStatus
    price_raw: str = "N/A"
    price_value: float | None = None
    news: list[NewsItem] = Field(default_factory=list)
    summary: str = "暂无总结"
    trend: Trend = Trend.UNKNOWN
    reasons: list[str] = Field(default_factory=list)
    advice: str = "暂无建议"
    raw_output: str = ""
    model_name: str = ""
    prompt_version: str = ""
    latency_ms: int = 0
    error: str | None = None
    input_snapshot: dict[str, Any] = Field(default_factory=dict)


class PricePoint(BaseModel):
    time: str
    price: float | None = None
    trend: Trend = Trend.UNKNOWN


class DashboardSummary(BaseModel):
    latest: AnalysisRecord | None = None
    price_points: list[PricePoint] = Field(default_factory=list)
    trend_counts: dict[str, int] = Field(default_factory=dict)
    status_counts: dict[str, int] = Field(default_factory=dict)
    total_records: int = 0
