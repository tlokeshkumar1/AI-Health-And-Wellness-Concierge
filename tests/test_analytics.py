from backend.utils.analytics import compute_weekly_trends

def test_compute_weekly_trends():
    logs = [
        {"sleep_hours": 8, "steps": 10000, "mood": "Happy"},
        {"sleep_hours": 6, "steps": 5000, "mood": "Tired"}
    ]
    
    result = compute_weekly_trends(logs)
    
    assert result["average_sleep"] == 7.0
    assert result["total_steps"] == 15000
    # Happy=5, Tired=2 -> Avg=3.5
    assert result["average_mood_score"] == 3.5
