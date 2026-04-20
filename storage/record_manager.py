import json
import os
from datetime import datetime



# 构建记录
def build_record(price, news, summary, analysis):
    now = datetime.now()
    time_str = now.strftime("%Y-%m-%d %H:%M:%S")

    record_id = f"{time_str}_{price}"

    record = {
        "id": record_id,
        "time": time_str,
        "price": price,
        "news": news,
        "summary": summary,
        "analysis": analysis
    }
    return record


# 保存记录
def save_record(record):
    record_file = "gold_record.json"
    if os.path.exists(record_file):
        with open(record_file, "r", encoding="utf-8") as f:
            records = json.load(f)
    else:
        records = []

    records.append(record)

    with open(record_file, "w", encoding="utf-8") as f:
        json.dump(records, f, ensure_ascii=False, indent=4)



#读 取json文件
def get_all_records():
    file_path = "gold_record.json"

    if not os.path.exists(file_path):
        return []

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            records = json.load(f)
        return records
    except json.JSONDecodeError:
        return []

# 获取最新3条记录
def get_latest_records(n):
    records = get_all_records()

    if len(records) <= n:
        return records

    return records[-n:]
# 删除记录
def delete_record(record_id):
    file_path = "gold_record.json"

    if not os.path.exists(file_path):
        return {"success": False, "message": "记录文件不存在"}

    try:
        with open(file_path, "r", encoding="utf-8") as f:
            records = json.load(f)
    except json.JSONDecodeError:
        return {"success": False, "message": "记录文件损坏"}

    new_records = [record for record in records if record.get("id") != record_id]

    if len(new_records) == len(records):
        return {"success": False, "message": "未找到对应记录"}

    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(new_records, f, ensure_ascii=False, indent=4)

    return {"success": True, "message": "删除成功"}