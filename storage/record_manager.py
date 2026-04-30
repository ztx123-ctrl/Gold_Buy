from contextlib import closing
import json
import sqlite3
from pathlib import Path

from schemas import AnalysisRecord, AnalysisStatus, DashboardSummary, NewsItem, PricePoint, Trend


BASE_DIR = Path(__file__).resolve().parent.parent
DB_PATH = BASE_DIR / "gold_records.db"


def _connect() -> sqlite3.Connection:
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def _ensure_columns(connection: sqlite3.Connection) -> None:
    expected = {
        "id": "TEXT PRIMARY KEY",
        "time": "TEXT NOT NULL",
        "source": "TEXT NOT NULL",
        "status": "TEXT NOT NULL",
        "price_raw": "TEXT NOT NULL DEFAULT 'N/A'",
        "price_value": "REAL",
        "news": "TEXT NOT NULL DEFAULT '[]'",
        "summary": "TEXT NOT NULL DEFAULT ''",
        "trend": "TEXT NOT NULL DEFAULT '未知'",
        "reasons": "TEXT NOT NULL DEFAULT '[]'",
        "advice": "TEXT NOT NULL DEFAULT ''",
        "raw_output": "TEXT NOT NULL DEFAULT ''",
        "model_name": "TEXT NOT NULL DEFAULT ''",
        "prompt_version": "TEXT NOT NULL DEFAULT ''",
        "latency_ms": "INTEGER NOT NULL DEFAULT 0",
        "error": "TEXT",
        "input_snapshot": "TEXT NOT NULL DEFAULT '{}'",
    }
    rows = connection.execute("PRAGMA table_info(analysis_records)").fetchall()
    existing = {row["name"] for row in rows}
    for name, ddl in expected.items():
        if name not in existing:
            connection.execute(f"ALTER TABLE analysis_records ADD COLUMN {name} {ddl}")


def init_storage() -> None:
    with closing(_connect()) as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS analysis_records (
                id TEXT PRIMARY KEY,
                time TEXT NOT NULL,
                source TEXT NOT NULL,
                status TEXT NOT NULL,
                price_raw TEXT NOT NULL DEFAULT 'N/A',
                price_value REAL,
                news TEXT NOT NULL DEFAULT '[]',
                summary TEXT NOT NULL DEFAULT '',
                trend TEXT NOT NULL DEFAULT '未知',
                reasons TEXT NOT NULL DEFAULT '[]',
                advice TEXT NOT NULL DEFAULT '',
                raw_output TEXT NOT NULL DEFAULT '',
                model_name TEXT NOT NULL DEFAULT '',
                prompt_version TEXT NOT NULL DEFAULT '',
                latency_ms INTEGER NOT NULL DEFAULT 0,
                error TEXT,
                input_snapshot TEXT NOT NULL DEFAULT '{}'
            )
            """
        )
        _ensure_columns(connection)
        connection.commit()


def save_record(record: AnalysisRecord) -> None:
    with closing(_connect()) as connection:
        connection.execute(
            """
            INSERT OR REPLACE INTO analysis_records (
                id, time, source, status, price_raw, price_value, news, summary, trend,
                reasons, advice, raw_output, model_name, prompt_version, latency_ms,
                error, input_snapshot
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                record.id,
                record.time,
                record.source,
                record.status.value,
                record.price_raw,
                record.price_value,
                json.dumps([item.model_dump(mode="json") for item in record.news], ensure_ascii=False),
                record.summary,
                record.trend.value,
                json.dumps(record.reasons, ensure_ascii=False),
                record.advice,
                record.raw_output,
                record.model_name,
                record.prompt_version,
                record.latency_ms,
                record.error,
                json.dumps(record.input_snapshot, ensure_ascii=False),
            ),
        )
        connection.commit()


def _row_to_record(row: sqlite3.Row) -> AnalysisRecord:
    news = [NewsItem.model_validate(item) for item in json.loads(row["news"] or "[]")]
    return AnalysisRecord(
        id=row["id"],
        time=row["time"],
        source=row["source"],
        status=AnalysisStatus(row["status"]),
        price_raw=row["price_raw"],
        price_value=row["price_value"],
        news=news,
        summary=row["summary"],
        trend=Trend(row["trend"]),
        reasons=json.loads(row["reasons"] or "[]"),
        advice=row["advice"],
        raw_output=row["raw_output"],
        model_name=row["model_name"],
        prompt_version=row["prompt_version"],
        latency_ms=row["latency_ms"],
        error=row["error"],
        input_snapshot=json.loads(row["input_snapshot"] or "{}"),
    )


def get_all_records() -> list[AnalysisRecord]:
    init_storage()
    with closing(_connect()) as connection:
        rows = connection.execute("SELECT * FROM analysis_records ORDER BY time DESC").fetchall()
    return [_row_to_record(row) for row in rows]


def get_latest_records(n: int) -> list[AnalysisRecord]:
    init_storage()
    with closing(_connect()) as connection:
        rows = connection.execute(
            "SELECT * FROM analysis_records ORDER BY time DESC LIMIT ?",
            (max(n, 1),),
        ).fetchall()
    return [_row_to_record(row) for row in rows]


def delete_record(record_id: str) -> tuple[bool, str]:
    init_storage()
    with closing(_connect()) as connection:
        cursor = connection.execute("DELETE FROM analysis_records WHERE id = ?", (record_id,))
        connection.commit()

    if cursor.rowcount == 0:
        return False, "未找到对应记录"
    return True, "删除成功"


def get_dashboard_summary(limit: int = 24) -> DashboardSummary:
    records = list(reversed(get_latest_records(limit)))
    trend_counts = {trend.value: 0 for trend in Trend}
    status_counts = {status.value: 0 for status in AnalysisStatus}
    price_points: list[PricePoint] = []

    for record in records:
        trend_counts[record.trend.value] += 1
        status_counts[record.status.value] += 1
        price_points.append(PricePoint(time=record.time, price=record.price_value, trend=record.trend))

    latest = records[-1] if records else None
    return DashboardSummary(
        latest=latest,
        price_points=price_points,
        trend_counts=trend_counts,
        status_counts=status_counts,
        total_records=len(records),
    )
