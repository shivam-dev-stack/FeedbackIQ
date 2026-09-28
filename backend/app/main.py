from fastapi import FastAPI
from app.core.database import AsyncSessionLocal
from sqlalchemy  import text

app = FastAPI(
    title="FeedbackIQ API",
    version="0.1.0",
)


@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.get("/health/db")
async def database_health_check():
    async with AsyncSessionLocal() as session:
        result = await session.execute(text("SELECT 1"))
        return {"database": result.scalar()}