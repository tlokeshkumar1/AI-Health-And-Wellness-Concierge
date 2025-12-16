from fastapi import APIRouter, HTTPException, Query, Depends
from backend.agents.mcp_connectors import database_tool
from backend.models.schemas import Memory, User
from backend.utils.auth import get_current_user

router = APIRouter(prefix="/memory", tags=["memory"])

@router.get("/", response_model=Memory)
async def get_user_memory(
    current_user: User = Depends(get_current_user)
):
    try:
        memory = await database_tool.get_user_memory(current_user.id)
        if not memory:
            # Return empty memory if none exists
            return Memory(user_id=current_user.id, habits=[])
        return memory
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))