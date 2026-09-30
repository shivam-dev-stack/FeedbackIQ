from fastapi import FastAPI
from app.core.database import AsyncSessionLocal
from sqlalchemy  import text

from fastapi import Depends
from app.core.security import get_current_user
from app.api.routes.auth import router as auth_router



app = FastAPI(
    title="FeedbackIQ API",
    version="0.1.0",
)

app.include_router(auth_router)


@app.get("/me")
async def get_me(user=Depends(get_current_user)):
    return {
        "id": str(user.id),
        "email": user.email,
    }


@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.get("/health/db")
async def database_health_check():
    async with AsyncSessionLocal() as session:
        result = await session.execute(text("SELECT 1"))
        return {"database": result.scalar()}