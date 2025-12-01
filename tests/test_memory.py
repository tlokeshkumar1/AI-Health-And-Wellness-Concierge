import pytest
from backend.agents.memory_agent import HabitMemoryAgent
from backend.models.schemas import DailyLog
from unittest.mock import AsyncMock, patch

@pytest.mark.asyncio
async def test_process_log_new_habit():
    agent = HabitMemoryAgent()
    
    # Mock database tool
    with patch("backend.agents.mcp_connectors.database_tool") as mock_db:
        mock_db.get_user_memory = AsyncMock(return_value=None)
        mock_db.update_user_memory = AsyncMock()
        
        log = DailyLog(
            user_id="user1",
            date="2023-10-01",
            sleep_hours=5.0, # Should trigger sleep deprived
            steps=9000,      # Should trigger active walker
            meals=[],
            water_intake=1.0, # Should trigger hydration struggle
            mood="Neutral"
        )
        
        habits = await agent.process_log(log)
        
        assert "Often sleep deprived" in habits
        assert "Active walker" in habits
        assert "Struggles with hydration" in habits
