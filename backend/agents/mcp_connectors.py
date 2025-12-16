import json
import csv
from typing import List, Dict, Any
from backend.database.mongo import save_log, get_logs, update_memory, get_memory
from backend.models.schemas import DailyLog
from backend.utils.weather import get_weather

class FileTool:
    """Reads daily logs from JSON or CSV."""
    async def read_logs(self, file_path: str) -> List[Dict]:
        if file_path.endswith('.json'):
            with open(file_path, 'r') as f:
                return json.load(f)
        elif file_path.endswith('.csv'):
            with open(file_path, 'r') as f:
                reader = csv.DictReader(f)
                return list(reader)
        return []

class CalendarTool:
    """Mock calendar tool for creating reminders."""
    async def create_event(self, title: str, start_time: str, description: str):
        # In a real app, this would use Google Calendar API
        print(f"[Calendar] Created event: {title} at {start_time} - {description}")
        return {"status": "success", "event": title}
    
    async def schedule_reminder(self, user_id: str, reminder_type: str, time: str, description: str):
        """Schedule a specific type of reminder for a user."""
        title = f"{reminder_type.replace('_', ' ').title()} Reminder"
        # In a real app, this would use Google Calendar API to create recurring events
        print(f"[Calendar] Scheduled {reminder_type} reminder for user {user_id} at {time}: {description}")
        return {"status": "success", "event": title, "time": time}

class DatabaseTool:
    """Wrapper for MongoDB operations."""
    async def save_daily_log(self, log_data: Dict):
        log = DailyLog(**log_data)
        await save_log(log)
        return {"status": "saved"}

    async def get_recent_logs(self, user_id: str, days: int = 7):
        return await get_logs(user_id, days)

    async def get_user_memory(self, user_id: str):
        return await get_memory(user_id)

    async def update_user_memory(self, user_id: str, habits: List[str]):
        await update_memory(user_id, habits)

class BrowserTool:
    """Fetches weather info."""
    async def get_weather_info(self, location: str):
        return await get_weather(location)

# Instantiate tools
file_tool = FileTool()
calendar_tool = CalendarTool()
database_tool = DatabaseTool()
browser_tool = BrowserTool()
