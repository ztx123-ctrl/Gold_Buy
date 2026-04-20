import time
import requests
import re


def get_gold_price():
    try:
        t = int(time.time() * 1000)
        url = f"https://www.huilvbiao.com/api/gold_indexApi?t={t}"

        headers = {
            "User-Agent": "Mozilla/5.0"
        }

        response = requests.get(url, headers=headers, timeout=5)
        text = response.text

        # 提取纽约黄金（GC）
        match = re.search(r'hq_str_hf_GC="([^"]+)"', text)

        if match:
            data_str = match.group(1)
            data_list = data_str.split(",")

            return data_list[0]

        return "未获取到国际金价"
    except Exception as e:
        return "获取国际金价失败"
if __name__ == "__main__":
    print(get_gold_price())