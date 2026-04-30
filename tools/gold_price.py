import re
import time

import requests


def get_gold_price() -> str:
    try:
        timestamp = int(time.time() * 1000)
        url = f"https://www.huilvbiao.com/api/gold_indexApi?t={timestamp}"
        headers = {"User-Agent": "Mozilla/5.0"}

        response = requests.get(url, headers=headers, timeout=5)
        response.raise_for_status()
        match = re.search(r'hq_str_hf_GC="([^"]+)"', response.text)
        if not match:
            return "N/A"

        data_list = match.group(1).split(",")
        return data_list[0].strip() if data_list else "N/A"
    except Exception:
        return "N/A"
