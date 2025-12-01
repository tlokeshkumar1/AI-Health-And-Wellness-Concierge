import json
from backend.agents.mcp_connectors import database_tool, browser_tool
from backend.utils.llm_client import llm_client
from backend.models.schemas import PlanResponse
from datetime import datetime

class WellnessAgent:
    async def generate_plan(self, user_id: str, date: str, location: str = "New York") -> PlanResponse:
        # 1. Gather Context
        logs = await database_tool.get_recent_logs(user_id, 7)
        memory = await database_tool.get_user_memory(user_id)
        weather = await browser_tool.get_weather_info(location)
        
        habits = memory.habits if memory else []
        
        # 2. Construct Prompt
        prompt = f"""
        You are a Wellness Planner Agent. Generate a daily plan for the user.
        
        Context:
        - Date: {date}
        - Weather: {weather}
        - User Habits: {', '.join(habits)}
        - Recent Activity (Last 7 days): {len(logs)} logs found.
        
        Task:
        Create a personalized plan including:
        1. Hydration goal
        2. Workout suggestion
        3. Meal recommendations
        4. Break reminders
        5. Mood support message
        6. Sleep tip
        7. Weather-based tip
        
        Output JSON format:
        {{
            "hydration_goal": "...",
            "workout": "...",
            "meals": "...",
            "break_reminders": ["...", "..."],
            "mood_support": "...",
            "sleep_tip": "...",
            "weather_tip": "..."
        }}
        """
        
        # 3. Call LLM
        response = await llm_client.generate_response(prompt)
        
        # 4. Parse and Return
        return PlanResponse(
            date=date,
            hydration_goal=response.get("hydration_goal", "Drink 2L water"),
            workout=response.get("workout", "30 min walk"),
            meals=response.get("meals", "Balanced diet"),
            break_reminders=response.get("break_reminders", ["Take a break"]),
            mood_support=response.get("mood_support", "Have a great day!"),
            sleep_tip=response.get("sleep_tip", "Sleep 8 hours"),
            weather_tip=response.get("weather_tip", "Check forecast"),
            disclaimer="This service provides lifestyle suggestions only and is not medical advice."
        )

wellness_agent = WellnessAgent()
