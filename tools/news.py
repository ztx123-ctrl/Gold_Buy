import re
import requests

def get_gold_news():
    try:
        url = "https://finance.sina.com.cn/roll/c/57084.shtml"
        headers = {
            "User-Agent": "Mozilla/5.0"
        }

        response = requests.get(url, headers=headers, timeout=5)
        response.encoding = response.apparent_encoding
        html = response.text

        pattern = re.compile(r'<a[^>]*href="(.*?)"[^>]*>(.*?)</a>', re.S)
        news_list = re.findall(pattern, html)

        keywords = ["黄金", "金价", "贵金属"]

        news_result = []
        for link, title in news_list:
            title = re.sub(r"<.*?>", "", title).strip()

            # 过滤掉太短的、分析类、无关内容
            if len(title) <= 10:
                continue
            if title.startswith("分析："):
                continue

            if any(k in title for k in keywords):
                news_result.append(title)

            if len(news_result) == 3:
                break

        if news_result:
            return "\n".join([f"{i+1}. {t}" for i, t in enumerate(news_result)])
        return "未获取到相关新闻"

    except Exception as e:
        return f"获取新闻失败: {e}"

def summarize_gold_news(llm, news):
    prompt = f"""
你是一名金融资讯整理助手。

下面是多条黄金市场相关新闻，请提炼出核心信息，要求：
1. 总结为2到3句话
2. 只提炼事件和影响因素
3. 不要给出投资建议
4. 不要重复原文

【新闻】
{news}
"""

    try:
        response = llm.invoke(prompt)

        if response and response.content:
            return response.content
        else:
            return "新闻总结失败"

    except Exception as e:
        return f"新闻总结失败: {e}"

if __name__ == "__main__":
    print(get_gold_news())