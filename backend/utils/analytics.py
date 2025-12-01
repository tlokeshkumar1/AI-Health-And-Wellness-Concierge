import pandas as pd
from typing import List, Dict
from backend.models.schemas import DailyLog

def compute_weekly_trends(logs: List[Dict]) -> Dict:
    if not logs:
        return {
            "average_sleep": 0,
            "total_steps": 0,
            "average_mood_score": 0,
            "summary_text": "No data available for this week."
        }
        
    df = pd.DataFrame(logs)
    
    # Ensure numeric columns
    df['sleep_hours'] = pd.to_numeric(df['sleep_hours'])
    df['steps'] = pd.to_numeric(df['steps'])
    
    # Simple mood scoring mapping
    mood_map = {
        "Happy": 5, "Energetic": 4, "Neutral": 3, "Tired": 2, "Sad": 1, "Stressed": 1
    }
    df['mood_score'] = df['mood'].map(lambda x: mood_map.get(x, 3))
    
    avg_sleep = df['sleep_hours'].mean()
    total_steps = df['steps'].sum()
    avg_mood = df['mood_score'].mean()
    
    summary = f"You averaged {avg_sleep:.1f} hours of sleep and walked {total_steps} steps this week."
    
    return {
        "average_sleep": avg_sleep,
        "total_steps": total_steps,
        "average_mood_score": avg_mood,
        "summary_text": summary
    }
