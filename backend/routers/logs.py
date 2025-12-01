from fastapi import APIRouter, HTTPException
from backend.models.schemas import DailyLog
from backend.agents.mcp_connectors import database_tool
from backend.agents.memory_agent import memory_agent

router = APIRouter(prefix="/logs", tags=["logs"])

@router.post("/", response_model=dict)
async def submit_log(log: DailyLog):
    try:
        # 1. Save Log
        await database_tool.save_daily_log(log.dict())
        
        # 2. Trigger Memory Update
        new_habits = await memory_agent.process_log(log)
        
        return {
            "status": "success",
            "message": "Log saved successfully",
            "current_habits": new_habits
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
