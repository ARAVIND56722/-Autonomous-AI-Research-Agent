from fastapi import APIRouter, HTTPException
from app.services.paper_search import search_arxiv_papers

router = APIRouter()

@router.get("/search")
def search_papers(query: str = ""):
    try:
        papers = search_arxiv_papers(query)

        return {
            "query": query,
            "papers": papers
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"arXiv search failed: {str(e)}")