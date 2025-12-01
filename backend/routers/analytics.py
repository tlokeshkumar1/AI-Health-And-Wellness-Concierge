from fastapi import APIRouter, HTTPException, Query
from backend.agents.analytics_agent import analytics_agent
from backend.models.schemas import WeeklySummary

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/weekly", response_model=WeeklySummary)
async def get_weekly_analytics(
    user_id: str = Query(..., description="User ID")
):
    try:
        summary = await analytics_agent.generate_weekly_report(user_id)
        return summary
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
