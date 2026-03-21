from fastapi import APIRouter, HTTPException
from app.services.paper_reader import get_arxiv_paper_details

router = APIRouter()

@router.get("/read")
def read_paper(arxiv_id: str = ""):
    try:
        paper = get_arxiv_paper_details(arxiv_id)

        if not paper:
            raise HTTPException(status_code=404, detail="Paper not found")

        return {
            "paper": paper
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Paper read failed: {str(e)}")