from backend.agents.mcp_connectors import database_tool
from backend.utils.analytics import compute_weekly_trends
from backend.utils.charts import generate_charts
from backend.models.schemas import WeeklySummary
from datetime import datetime, timedelta

class AnalyticsAgent:
    async def generate_weekly_report(self, user_id: str) -> WeeklySummary:
        # 1. Fetch Data
        logs = await database_tool.get_recent_logs(user_id, 7)
        
        # 2. Compute Trends
        trends = compute_weekly_trends(logs)
        
        # 3. Generate Charts
        chart_paths = generate_charts(logs, user_id)
        
        # 4. Create Summary
        end_date = datetime.now().strftime("%Y-%m-%d")
        start_date = (datetime.now() - timedelta(days=7)).strftime("%Y-%m-%d")
        
        return WeeklySummary(
            start_date=start_date,
            end_date=end_date,
            average_sleep=trends["average_sleep"],
            total_steps=trends["total_steps"],
            average_mood_score=trends["average_mood_score"],
            summary_text=trends["summary_text"],
            chart_paths=chart_paths
        )

analytics_agent = AnalyticsAgent()
