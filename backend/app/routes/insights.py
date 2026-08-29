from fastapi import APIRouter
from app.services.insight_service import generate_insights

router = APIRouter()

@router.get("/insights")
def get_insights(query: str = ""):
    insights = generate_insights(query)

    return {
        "query": query,
        "insights": insights
    }