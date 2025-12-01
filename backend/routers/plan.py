from fastapi import APIRouter, HTTPException, Query
from backend.agents.wellness_agent import wellness_agent
from backend.models.schemas import PlanResponse

router = APIRouter(prefix="/plan", tags=["plan"])

@router.get("/", response_model=PlanResponse)
async def get_daily_plan(
    user_id: str = Query(..., description="User ID"),
    date: str = Query(..., description="Date for the plan (YYYY-MM-DD)"),
    location: str = Query("New York", description="User location for weather")
):
    try:
        plan = await wellness_agent.generate_plan(user_id, date, location)
        return plan
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
