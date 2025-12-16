from fastapi import APIRouter, HTTPException, Body, Depends
from backend.agents.mcp_connectors import calendar_tool
from backend.models.schemas import User
from backend.utils.auth import get_current_user
from typing import List

router = APIRouter(prefix="/reminders", tags=["reminders"])

@router.post("/")
async def create_reminders(
    user_id: str = Body(...),
    reminders: List[str] = Body(...)
):
    try:
        results = []
        for reminder in reminders:
            # Simple parsing of reminder text to extract time could be added here
            # For now, we just schedule it as a generic event
            res = await calendar_tool.create_event(
                title=f"Wellness Reminder: {reminder}",
                start_time="Today", # Mock time
                description=reminder
            )
            results.append(res)
            
        return {"status": "success", "created": len(results)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/schedule-from-plan")
async def schedule_from_plan(
    plan_data: dict,
    current_user: User = Depends(get_current_user)
):
    """Schedule reminders based on a daily plan."""
    try:
        results = []
        user_id = current_user.id
        
        # Schedule water reminders
        for reminder_time in plan_data.get("break_reminders", []):
            res = await calendar_tool.schedule_reminder(
                user_id=user_id,
                reminder_type="water_intake",
                time=reminder_time,
                description="Remember to drink water"
            )
            results.append(res)
        
        # Schedule walking break reminder
        if plan_data.get("workout"):
            # For simplicity, we'll schedule a generic walking reminder
            res = await calendar_tool.schedule_reminder(
                user_id=user_id,
                reminder_type="walking_break",
                time="15:00",  # Default time
                description="Take a walking break as suggested in your plan"
            )
            results.append(res)
            
        # Schedule bedtime reminder based on sleep tip
        if plan_data.get("sleep_tip"):
            res = await calendar_tool.schedule_reminder(
                user_id=user_id,
                reminder_type="bedtime",
                time="21:30",  # Default bedtime
                description="Prepare for bed as suggested in your plan"
            )
            results.append(res)
            
        return {"status": "success", "scheduled": len(results), "details": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
