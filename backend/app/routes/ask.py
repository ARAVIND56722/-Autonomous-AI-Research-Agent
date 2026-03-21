from fastapi import APIRouter
from app.services.qa_service import generate_mock_answer

router = APIRouter()

@router.get("/ask")
def ask_question(
    query: str = "",
    question: str = "",
    paper_summary: str = "",
    paper_title: str = "",
):
    result = generate_mock_answer(query, question, paper_summary, paper_title)

    return {
        "query": query,
        "question": question,
        "response": result
    }