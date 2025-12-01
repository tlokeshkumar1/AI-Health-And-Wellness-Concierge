from backend.agents.mcp_connectors import database_tool
from backend.models.schemas import DailyLog

class HabitMemoryAgent:
    async def process_log(self, log: DailyLog):
        """Updates long-term habits based on new log."""
        user_id = log.user_id
        
        # Fetch existing memory
        memory = await database_tool.get_user_memory(user_id)
        current_habits = memory.habits if memory else []
        
        # Simple rule-based habit detection (could be LLM-based)
        new_habits = list(current_habits)
        
        if log.water_intake < 2.0:
            if "Struggles with hydration" not in new_habits:
                new_habits.append("Struggles with hydration")
        else:
            if "Struggles with hydration" in new_habits:
                new_habits.remove("Struggles with hydration")
                
        if log.sleep_hours < 6.0:
            if "Often sleep deprived" not in new_habits:
                new_habits.append("Often sleep deprived")
        
        if log.steps > 8000:
            if "Active walker" not in new_habits:
                new_habits.append("Active walker")
                
        # Update memory if changed
        if set(new_habits) != set(current_habits):
            await database_tool.update_user_memory(user_id, new_habits)
            
        return new_habits

memory_agent = HabitMemoryAgent()
