from fastapi import APIRouter, HTTPException
from langchain_google_genai.chat_models import GoogleRateLimitError

from app.services.qa_service import generate_answer

router = APIRouter()


@router.get("/ask")
def ask_question(
    query: str = "",
    question: str = "",
    arxiv_id: str = "",
    paper_title: str = "",
    pdf_url: str = "",
):

    try:

        result = generate_answer(
            query,
            question,
            arxiv_id,
            paper_title,
            pdf_url
        )

        return {
            "query": query,
            "question": question,
            "response": result
        }

    except GoogleRateLimitError:

        raise HTTPException(
            status_code=429,
            detail="AI service quota has been reached. Please try again later."
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate answer: {str(e)}"
        )