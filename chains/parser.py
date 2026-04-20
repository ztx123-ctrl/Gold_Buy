def parse_result(result: str):
    if not result:
        return {
            "summary": "暂无总结",
            "analysis": "暂无分析"
        }

    result = result.strip()

    marker = "1. 今日走势判断："

    if marker in result:
        parts = result.split(marker, 1)
        summary_part = parts[0].replace("新闻总结：", "").strip()
        analysis_part = marker + parts[1].strip()

        return {
            "summary": summary_part,
            "analysis": analysis_part
        }

    return {
        "summary": "暂无总结",
        "analysis": result
    }