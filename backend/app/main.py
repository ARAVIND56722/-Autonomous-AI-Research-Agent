from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.search import router as search_router
from app.routes.insights import router as insights_router
from app.routes.ask import router as ask_router
from app.routes.read import router as read_router

app = FastAPI(title="Autonomous AI Research Agent API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(search_router)
app.include_router(insights_router)
app.include_router(ask_router)
app.include_router(read_router)

@app.get("/")
def home():
    return {
        "message": "Autonomous AI Research Agent backend is running"
    }

@app.get("/health")
def health_check():
    return {
        "status": "success",
        "message": "Backend is healthy"
    }