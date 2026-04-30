# 黄金 LangChain 分析系统

这是一个基于 FastAPI、LangChain 和 SQLite 的黄金市场分析项目。系统会抓取黄金价格与相关新闻，使用兼容 OpenAI 协议的模型生成结构化分析结果，并通过 Web 页面展示最新结果、历史记录和趋势看板。

## 项目结构

- `app.py`: FastAPI 入口，负责页面和 `/api/*` 接口
- `chains/`: LangChain 分析主链，包含输入构造、Prompt、解析与执行编排
- `tools/`: 外部数据抓取
- `storage/`: SQLite 持久化与看板统计
- `templates/`: 首页与历史记录页
- `schemas.py`: 全局数据模型与接口契约

## 功能

- 实时金价获取
- 黄金相关新闻抓取
- LLM 结构化分析
- 历史记录保存与删除
- 趋势看板展示

## 环境变量

`.env` 至少需要：

```env
DASHSCOPE_API_KEY=your_api_key
DASHSCOPE_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
MODEL_NAME=qwen3.6-plus
REQUEST_TIMEOUT=30
NEWS_LIMIT=3
PROMPT_VERSION=v4
MODEL_MAX_RETRIES=1
```

## 启动方式

```bash
pip install -r requirements.txt
python -m uvicorn app:app --reload
```

启动后访问：

- 首页: `http://127.0.0.1:8000/`
- 历史页: `http://127.0.0.1:8000/records`

## API

- `GET /api/price`
- `POST /api/analysis/run`
- `GET /api/records`
- `GET /api/records/latest?n=20`
- `DELETE /api/records/{id}`
- `GET /api/dashboard/summary?limit=24`

接口统一返回：

```json
{
  "success": true,
  "data": {},
  "error": null
}
```

## LangChain 在项目中的职责

- 使用 `ChatPromptTemplate` 管理提示词
- 使用 runnable 组织分析链路
- 采用单次 JSON 输出并由本地解析器兜底
- 将抓取数据与 LLM 分析逻辑解耦
