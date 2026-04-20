import time
from langchain_openai import ChatOpenAI
from chains.analyzer import get_gold_analysis
from config import API_KEY, BASE_URL
from tools.news import get_gold_news
from tools.gold_price import get_gold_price
from prompts.gold_prompt import build_gold_full_prompt
from storage.record_manager import build_record, save_record
from datetime import datetime
from chains.parser import parse_result

def run_gold_analysis_once():
    total_start = time.time()

    llm = ChatOpenAI(
        model="qwen3.6-plus",
        api_key=API_KEY,
        base_url=BASE_URL,
    )

    t1 = time.time()
    price = get_gold_price()
    print("获取金价耗时:", time.time() - t1)

    t2 = time.time()
    news = get_gold_news()
    print("获取新闻耗时:", time.time() - t2)

    t3 = time.time()
    prompt = build_gold_full_prompt(price, news)
    result = get_gold_analysis(llm, prompt)
    parsed = parse_result(result)
    summary = parsed["summary"]
    analysis = parsed["analysis"]
    print("单次分析耗时:", time.time() - t3)

    now = datetime.now()
    time_str = now.strftime("%Y-%m-%d %H:%M:%S")

    record = build_record(price, news, summary, analysis)
    save_record(record)

    with open("gold_report.txt", "a", encoding="utf-8") as f:
        f.write("====\n")
        f.write("黄金市场分析报告\n")
        f.write(f"时间: {time_str}\n")
        f.write(f"金价: {price}\n")
        f.write("新闻原文:\n")

        if isinstance(news, list):
            f.write("\n".join(news) + "\n")
        else:
            f.write(str(news) + "\n")

        f.write("综合分析结果:\n")
        f.write(f"{result}\n\n")

    print("总耗时:", time.time() - total_start)

    return {
        "price": price,
        "news": news,
        "summary": summary,
        "analysis": analysis,
        "time": time_str
    }