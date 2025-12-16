from fastapi import APIRouter, HTTPException, Query, Depends
from backend.agents.wellness_agent import wellness_agent
from backend.models.schemas import PlanResponse, User
from backend.utils.auth import get_current_user

router = APIRouter(prefix="/plan", tags=["plan"])

@router.get("/", response_model=PlanResponse)
async def get_daily_plan(
    current_user: User = Depends(get_current_user),
    date: str = Query(..., description="Date for the plan (YYYY-MM-DD)"),
    location: str = Query("New York", description="User location for weather")
):
    try:
        plan = await wellness_agent.generate_plan(current_user.id, date, location)
        return plan
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
