from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from storage.record_manager import get_all_records, get_latest_records, delete_record
from chains.runner import run_gold_analysis_once
from tools.gold_price import get_gold_price
from datetime import datetime
from fastapi.responses import FileResponse
from pathlib import Path
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent

@app.get("/")
def home():
    return FileResponse(BASE_DIR / "templates" / "index.html")

@app.get("/records")
def read_records():
    return get_all_records()

@app.get("/records/latest")
def read_latest_records(n: int = 3):
    return get_latest_records(n)

@app.get("/gold_once")
def run_gold_once():
    return run_gold_analysis_once()

@app.delete("/records/{record_id}")
def remove_record(record_id: str):
    return delete_record(record_id)

@app.get("/gold_price")
def read_gold_price():
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    price = get_gold_price()

    return {
        "price": price,
        "time": now
    }
# 记录页面
@app.get("/records_page")
def records_page():
    return FileResponse(BASE_DIR / "templates" / "records.html")