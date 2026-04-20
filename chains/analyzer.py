def get_gold_analysis(llm,prompt):
    try:
       #流式输出
        full_text = ""
        for chunk in llm.stream(prompt):
            if chunk.content:
                print(chunk.content, end="", flush=True)  # 实时输出
                full_text += chunk.content

        print()  # 最后换行
        return full_text

    except Exception as e:
        return f"模型调用失败: {e}"

