from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv("DASHSCOPE_API_KEY")
if not API_KEY:
    raise ValueError("请设置 DASHSCOPE_API_KEY")
BASE_URL = os.getenv("DASHSCOPE_BASE_URL")
if not BASE_URL:
    raise ValueError("请设置 DASHSCOPE_BASE_URL")