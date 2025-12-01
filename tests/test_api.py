from fastapi.testclient import TestClient
from backend.main import app
from unittest.mock import patch

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to AI Health & Wellness Concierge"}

@patch("backend.agents.mcp_connectors.database_tool.save_daily_log")
@patch("backend.agents.memory_agent.memory_agent.process_log")
def test_submit_log(mock_process, mock_save):
    mock_save.return_value = {"status": "saved"}
    mock_process.return_value = ["Active walker"]
    
    log_data = {
        "user_id": "test_user",
        "date": "2023-10-27",
        "sleep_hours": 7.5,
        "steps": 8000,
        "meals": ["Oatmeal"],
        "water_intake": 2.5,
        "mood": "Energetic"
    }
    
    response = client.post("/logs/", json=log_data)
    assert response.status_code == 200
    assert response.json()["status"] == "success"

@patch("backend.agents.wellness_agent.wellness_agent.generate_plan")
def test_get_plan(mock_generate):
    mock_generate.return_value = {
        "date": "2023-10-27",
        "hydration_goal": "2L",
        "workout": "Walk",
        "meals": "Healthy",
        "break_reminders": [],
        "mood_support": "Good",
        "sleep_tip": "Sleep well",
        "weather_tip": "Sunny",
        "disclaimer": "Disclaimer"
    }
    
    response = client.get("/plan/?user_id=test_user&date=2023-10-27")
    assert response.status_code == 200
    assert response.json()["hydration_goal"] == "2L"
