def generate_mock_answer(query: str = "", question: str = "", paper_summary: str = "", paper_title: str = ""):
    topic = query.strip() if query.strip() else "Autonomous AI Research"
    asked = question.strip() if question.strip() else "What is the main idea?"

    if paper_summary.strip():
        short_summary = paper_summary[:1200]

        answer = (
            f"Based on the selected paper"
            f"{f' titled {paper_title}' if paper_title else ''}, "
            f"the abstract suggests that {short_summary} "
            f"For your question '{asked}', the answer is derived from this paper context rather than only the general topic. "
            f"In simple terms, this paper contributes to {topic} by providing research evidence, methods, or findings relevant to your question."
        )
    else:
        answer = (
            f"Based on the retrieved papers for {topic}, the system uses RAG to fetch relevant "
            f"research context, AI agents to manage multi-step tasks like search and comparison, "
            f"and LLM reasoning to summarize evidence and answer questions. For your question "
            f"'{asked}', the grounded answer would ideally be produced from the most relevant paper content."
        )

    return {
        "topic": topic,
        "question": asked,
        "paper_title": paper_title,
        "answer": answer
    }