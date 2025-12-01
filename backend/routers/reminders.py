from fastapi import APIRouter, HTTPException, Body
from backend.agents.mcp_connectors import calendar_tool
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
