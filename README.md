# 黄金AI分析系统

一个基于 FastAPI + LLM 的黄金市场分析系统。

## 功能

- 实时金价获取（自动刷新）
- 新闻抓取（多条筛选）
- AI 自动总结 + 趋势分析
- 买 / 卖信号生成
- 历史记录保存与管理
- Web 可视化界面

## 启动方式

```bash
pip install -r requirements.txt
python -m uvicorn app:app --reload
