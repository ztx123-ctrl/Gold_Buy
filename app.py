import logging
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from chains.runner import run_gold_analysis_once
from storage.record_manager import delete_record, get_all_records, get_dashboard_summary, get_latest_records, init_storage
from tools.gold_price import get_gold_price


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s [%(name)s] %(message)s",
)

app = FastAPI(title="Gold LangChain Analyzer")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent


def success_response(data):
    return {"success": True, "data": data, "error": None}


def error_response(message: str):
    return {"success": False, "data": None, "error": message}


@app.on_event("startup")
def startup() -> None:
    init_storage()


@app.get("/")
def home():
    return FileResponse(BASE_DIR / "templates" / "index.html")


@app.get("/records")
def records_page():
    return FileResponse(BASE_DIR / "templates" / "records.html")


@app.get("/api/price")
def read_gold_price():
    price_raw = get_gold_price()
    try:
        price_value = float(price_raw)
    except (TypeError, ValueError):
        price_value = None
    return success_response({"price_raw": price_raw, "price_value": price_value})


@app.post("/api/analysis/run")
def run_analysis():
    try:
        record = run_gold_analysis_once()
        return success_response(record.model_dump(mode="json"))
    except Exception as exc:
        logging.getLogger(__name__).exception("Analysis request failed")
        return error_response(f"分析执行失败: {exc}")


@app.get("/api/records")
def read_records():
    return success_response([record.model_dump(mode="json") for record in get_all_records()])


@app.get("/api/records/latest")
def read_latest_records(n: int = 20):
    return success_response([record.model_dump(mode="json") for record in get_latest_records(n)])


@app.delete("/api/records/{record_id}")
def remove_record(record_id: str):
    success, message = delete_record(record_id)
    if success:
        return success_response({"message": message})
    return error_response(message)


@app.get("/api/dashboard/summary")
def read_dashboard_summary(limit: int = 24):
    return success_response(get_dashboard_summary(limit).model_dump(mode="json"))
