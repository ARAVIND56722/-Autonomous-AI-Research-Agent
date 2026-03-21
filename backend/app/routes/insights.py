from fastapi import APIRouter
from app.services.insight_service import generate_mock_insights

router = APIRouter()

@router.get("/insights")
def get_insights(query: str = ""):
    insights = generate_mock_insights(query)

    return {
        "query": query,
        "insights": insights
    }