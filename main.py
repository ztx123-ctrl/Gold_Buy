# from langchain_openai import ChatOpenAI
# from chains.analyzer import get_gold_analysis
# from config import API_KEY, BASE_URL
# from tools.news import get_gold_news, summarize_gold_news
# from tools.gold_price import get_gold_price
# from prompts.gold_prompt import build_gold_prompt
# from datetime import datetime
# from storage.record_manager import build_record, save_record
#
# llm = ChatOpenAI(
#     model="qwen3.6-plus",
#     api_key=API_KEY,
#     base_url=BASE_URL,
# )
#
# print("1. 开始获取金价")
# price = get_gold_price()
# print("price =", price)
#
# print("2. 开始获取新闻")
# news = get_gold_news()
# print("news =", news)
#
# print("3. 开始总结新闻")
# news_summary = summarize_gold_news(llm, news)
# print("news_summary =", news_summary)
#
# print("4. 开始构建 prompt")
# prompt = build_gold_prompt(price, news_summary)
# print("prompt 构建完成")
#
# print("5. 开始生成分析")
# analysis = get_gold_analysis(llm, prompt)
# print("analysis =", analysis)
#
# print("6. 开始保存 JSON")
# record = build_record(price, news, news_summary, analysis)
# save_record(record)
# print("JSON 保存成功")
#
# print("7. 开始保存 TXT")
# now = datetime.now()
# time_str = now.strftime("%Y-%m-%d %H:%M:%S")
#
# with open("gold_report.txt", "a", encoding="utf-8") as f:
#     f.write("====\n")
#     f.write("黄金市场分析报告\n")
#     f.write(f"时间: {time_str}\n")
#     f.write(f"金价: {price}\n")
#     f.write("新闻原文:\n")
#
#     if isinstance(news, list):
#         f.write("\n".join(news) + "\n")
#     else:
#         f.write(str(news) + "\n")
#
#     f.write("新闻总结:\n")
#     f.write(f"{news_summary}\n")
#     f.write(f"{analysis}\n\n")
#
# print("TXT 保存成功")