def generate_mock_insights(query: str = ""):
    topic = query if query.strip() else "Autonomous AI Research"

    return {
        "topic": topic,
        "key_insight": f"RAG improves the reliability of {topic} workflows by grounding answers in retrieved research paper content.",
        "research_trend": f"AI agents are increasingly being used to automate multi-step literature review, filtering, summarization, and comparison tasks for {topic}.",
        "research_gap": f"LLM reasoning can compare methods and results in {topic}, but more work is needed to improve factual consistency and source grounding.",
        "why_it_matters": f"This helps users move beyond simple paper search by turning research findings in {topic} into understandable, structured insights."
    }