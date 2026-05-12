# Aurum · 黄金市场分析平台

基于 FastAPI + LangChain + SQLite 的黄金市场分析与每日方向预测系统。系统在两条节奏上运行：

- **每 30 分钟**抓取 COMEX 实时价 + 新浪财经新闻，调用 LLM 输出结构化短线分析。
- **每日 02:50（北京）**：拉取 SGE Au(T+D) + COMEX GC 双源收盘 + 宏观指标（FRED DXY 代理、US10Y 实际收益）+ 技术指标（ATR/RSI/距 MA20 z-score）+ regime 标签 → 调 LLM 产出明日方向预测 → 经"校准 → flat gate → trend gate"后处理流水线落库；03:05 锁定当日 OHLC，03:10 用次日收盘做校验。

前端是独立的 Vite + TypeScript SPA（`frontend/`），构建产物输出到 `static_dist/`，由 FastAPI 直接挂载。

## 项目结构

- `app.py`：FastAPI 入口，挂载 SPA、定义所有 `/api/*` 接口和 SSE 流。
- `config.py`：从 `.env` 读取配置，含 `MOCK_LLM` / `SCHEDULER_*` / `ADMIN_TOKEN` 等开关。
- `schemas.py`：Pydantic 模型 + 枚举（Trend / DailyPrediction / AccuracyMetricsV2 / ChatSession 等）。
- `chains/`：业务编排
  - `runner.py` 30 分钟分析链；`daily_runner.py` 每日预测主链；`verifier.py` 次日校验；`daily_lock.py` OHLC 锁定。
  - `scheduler.py` asyncio 调度器（interval + 02:50/03:05/03:10 三条 wall-clock cron）。
  - `calibration.py` 后处理标定器；`flat_gate.py` 震荡硬闸；`regime.py` 双源 regime 分类；`metrics.py` Brier/log-loss/ECE。
  - `events.py` 进程内事件总线（SSE）；`broadcast.py` 多通道推送（Webhook / Telegram / 飞书 / 企业微信 / 邮件）。
  - `hermes_chat.py` 聊天链；`analysis_chain.py` / `parser.py` / `input_builder.py` / `mock_llm.py` 通用链路组件。
- `tools/`：数据抓取与计算
  - `gold_price.py` COMEX 实时价 + 市场时段判定；`gold_close.py` 双源单次收盘；`gold_history.py` akshare 历史 OHLC；`news.py` 新浪滚动新闻。
  - `macro.py` FRED DTWEXBGS + DFII10（6h 缓存 + 全历史持久化）；`technicals.py` ATR/RSI/MA20 距离/realized vol（全部 lookahead-safe）。
  - `backtest_post_processing.py` 后处理流水线 raw vs post 配对回测 CLI。
- `prompts/`：`gold_prompt.py`（30 分钟分析）、`daily_prompt.py`（每日 v4-regime-tilt，含 7 条铁律）、`hermes_persona.py`（Hermes 人格与禁谈范围）。
- `storage/record_manager.py`：所有 SQLite 读写、表迁移、analytics/KPI/校准桶/v2 指标/聊天 CRUD。
- `frontend/`：Vite + TS SPA 源码（Landing / Dashboard / Predictions / Records / Insights / Settings / Chat 共 7 页）。
- `static_dist/`：SPA 构建产物，运行时由 `app.py` 挂到 `/static`。
- `scripts/`：数据迁移工具
  - `scrape_historical_ohlc.py` 回填 `daily_ohlc`（与每日 03:05 cron 共享逻辑，可用于初始化或修复）；`backtest_historical.py` 串行历史回测。
  - `scripts/archive/` 存放已完成且不再需要的一次性迁移脚本。
- `tests/`：覆盖各核心模块的单元测试。
- `deploy/`：systemd service + 部署脚本 + `.env` 模板。
- `hermes_skills/gold_buy_predictor/`：Hermes Agent 侧的 skill 与巡检脚本。

## 数据存储

全部数据在项目根目录的单个 SQLite 文件 `gold_records.db`（已被 `.gitignore` 排除），表如下：

| 表 | 用途 |
|---|---|
| `analysis_records` | 每 30 分钟一次的金价 + 新闻 + LLM 分析快照，含 outcome 校验字段 |
| `daily_predictions` | 每日预测（双源收盘、三概率 raw/post、calibrator/gate 审计、宏观/技术指标、verify 字段） |
| `daily_ohlc` | 锁定的历史 OHLC，`UNIQUE(date, source)`，`INSERT OR IGNORE`，sources = `sge` / `comex` |
| `macro_cache` | FRED 指标 6h TTL 快照缓存 |
| `macro_history` | FRED 全历史时间序列，回测路径使用 |
| `chat_sessions` / `chat_messages` | Hermes 对话会话与消息 |

`init_storage()` 在应用启动时调用，会自动 `CREATE TABLE IF NOT EXISTS` 并对旧库做 `ALTER TABLE ADD COLUMN` 兼容。

**热备份**：调度器每日 04:00（北京时间）通过 SQLite 官方 `Connection.backup()` API 把 `gold_records.db` 拷到 `backups/gold_records-YYYY-MM-DD_HHMMSS.db`，并保留最近 `BACKUP_KEEP` 份。冷启动时若当日已有备份则跳过。要禁用置 `BACKUP_ENABLED=0`。

## 环境变量

`.env` 最小集合：

```env
DASHSCOPE_API_KEY=your_api_key
DASHSCOPE_BASE_URL=https://dashscope.aliyuncs.com/compatible-mode/v1
MODEL_NAME=qwen-plus
REQUEST_TIMEOUT=30
NEWS_LIMIT=3
PROMPT_VERSION=v5
MODEL_MAX_RETRIES=1

# 调度
SCHEDULER_ENABLED=1                 # 30 分钟 interval
SCHEDULER_INTERVAL_SECONDS=1800
SCHEDULER_DAILY_ENABLED=1           # 02:50 / 03:05 / 03:10 三条 cron

# 可选
MOCK_LLM=0                          # 1 = 走确定性 mock，跳过 DashScope
ADMIN_TOKEN=                        # 留空 = 管理员接口禁用
ALLOW_TEST_NOTIFY=0                 # 是否允许 /api/notifications/test

# 备份（默认开启，每日 04:00 BJ 热备份 gold_records.db）
BACKUP_ENABLED=1
BACKUP_DIR=                         # 留空 = <项目根>/backups
BACKUP_KEEP=14                      # 保留最近 N 份，旧的自动清理

# 后处理开关（紧急回滚用，留空 = 启用）
AURUM_DISABLE_CALIBRATION=
AURUM_DISABLE_FLAT_GATE=
AURUM_DISABLE_TREND_GATE=

# 推送通道（任选其一即可，未配置则跳过）
WEBHOOK_URLS=                       # 逗号分隔
TELEGRAM_BOT_TOKEN= TELEGRAM_CHAT_ID=
FEISHU_WEBHOOK_URL=
WECOM_KEY=
EMAIL_SMTP_HOST= EMAIL_SMTP_PORT=587 EMAIL_SMTP_USER= EMAIL_SMTP_PASS= EMAIL_FROM= EMAIL_TO=

# Hermes 网关（可选；不可达时聊天自动回落到 LangChain 直连 DashScope）
HERMES_API_BASE=http://127.0.0.1:8642/v1
HERMES_API_KEY=local-aurum-bridge
HERMES_MODEL=hermes-agent
```

## 启动

```bash
# 后端
pip install -r requirements.txt
python -m uvicorn app:app --reload

# 前端（首次或源码改动后）
cd frontend && npm install && npm run build
```

访问 `http://127.0.0.1:8000/`，SPA 路由：`/`、`/app/*`、`/records` 都由前端接管。

> **部署建议**：调度器使用进程内 `threading.Lock` + asyncio 事件总线，**必须单实例运行**（uvicorn `--workers 1`），否则每日预测会重复触发 LLM 计费。

## 主要 API

行情 / 分析：

- `GET /api/price`
- `POST /api/analysis/run`
- `GET /api/records` · `GET /api/records/latest?n=20` · `DELETE /api/records/{id}`（管理员/本机）
- `GET /api/dashboard/summary?limit=24`
- `GET /api/analytics/{timeseries,distribution,kpis}?range=24h|7d|30d|...`

预测：

- `POST /api/predictions/daily/run?date=YYYY-MM-DD`
- `POST /api/predictions/daily/verify?date=YYYY-MM-DD`
- `GET /api/predictions/today` · `GET /api/predictions/daily?range=30d`
- `GET /api/predictions/accuracy?window=30d`
- `GET /api/predictions/calibration?window=30d&buckets=5`
- `GET /api/predictions/metrics/detailed?window=30d&include_raw=true`（v2，含 Brier/log-loss/ECE/reliability）
- `POST /api/predictions/inbox`（本机/管理员，外部 agent 追加评论）

聊天：

- `GET /api/chat/{runtime,greeting}`
- `GET|POST /api/chat/sessions` · `DELETE /api/chat/sessions/{id}`
- `GET /api/chat/sessions/{id}/messages` · `POST /api/chat/sessions/{id}/message`（流式）

推送 / 流：

- `GET /api/notifications/channels` · `POST /api/notifications/test`（管理员，需 `ALLOW_TEST_NOTIFY=1`）
- `GET /api/stream`（SSE，订阅 `analysis_record_added` / `daily_prediction_ready` / `prediction_verified` / `prediction_commentary`）

接口统一返回：

```json
{ "success": true, "data": {}, "error": null }
```

## LangChain 在项目中的职责

- `ChatPromptTemplate` 管理 30 分钟分析 prompt 与每日预测 prompt。
- runnable 编排 prompt → ChatOpenAI（DashScope 兼容协议）→ StrOutputParser 链路。
- 单次 JSON 输出，由 `chains/parser.py` 和 `daily_runner._parse_daily_output` 做本地解析 + 兜底。
- 数据抓取（`tools/`）与 LLM 调用解耦，便于 mock 与回测。

## Mock 模式

设 `MOCK_LLM=1`：所有 LLM 调用走 `chains/mock_llm.py` 的确定性哈希实现，行情抓取仍然走真实网络（金价 / 新闻可单独失败），适合无外网或 CI 环境。
