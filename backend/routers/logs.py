from fastapi import APIRouter, HTTPException, Depends
from backend.models.schemas import DailyLog, User
from backend.agents.mcp_connectors import database_tool
from backend.agents.memory_agent import memory_agent
from backend.agents.wellness_agent import wellness_agent
from backend.utils.auth import get_current_user

router = APIRouter(prefix="/logs", tags=["logs"])

@router.post("/", response_model=dict)
async def submit_log(log: DailyLog, current_user: User = Depends(get_current_user)):
    try:
        # Override user_id with authenticated user
        log.user_id = current_user.id
        
        # 1. Save Log
        await database_tool.save_daily_log(log.dict())
        
        # 2. Trigger Memory Update
        new_habits = await memory_agent.process_log(log)
        
        # 3. Generate daily plan based on the new log
        # This could be done asynchronously in a real implementation
        # For now, we'll just note that the plan should be regenerated
        # In a future implementation, we might want to trigger this asynchronously
        # or let the frontend request it when needed
        
        return {
            "status": "success",
            "message": "Log saved successfully",
            "current_habits": new_habits
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
