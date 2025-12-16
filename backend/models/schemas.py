from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    name: str
    password: str

class User(UserBase):
    id: str
    name: str
    is_active: bool = True

    class Config:
        json_schema_extra = {
            "example": {
                "id": "653a1b2c3d4e5f6a7b8c9d0e",
                "name": "John Doe",
                "email": "john@example.com",
                "is_active": True
            }
        }

class UserInDB(User):
    hashed_password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    user: User

class TokenData(BaseModel):
    email: Optional[str] = None

class DailyLog(BaseModel):
    user_id: str = Field(..., description="User identifier")
    date: str = Field(..., description="Date in YYYY-MM-DD format")
    sleep_hours: float = Field(..., ge=0, le=24, description="Hours of sleep")
    steps: int = Field(..., ge=0, description="Number of steps")
    meals: List[str] = Field(..., description="List of meals consumed")
    water_intake: float = Field(..., ge=0, description="Water intake in liters")
    mood: str = Field(..., description="Mood description")
    
    class Config:
        json_schema_extra = {
            "example": {
                "user_id": "user123",
                "date": "2023-10-27",
                "sleep_hours": 7.5,
                "steps": 8000,
                "meals": ["Oatmeal", "Salad", "Grilled Chicken"],
                "water_intake": 2.5,
                "mood": "Energetic"
            }
        }

class PlanResponse(BaseModel):
    date: str
    hydration_goal: str
    workout: str
    meals: str
    break_reminders: List[str]
    mood_support: str
    sleep_tip: str
    weather_tip: str
    disclaimer: str = "This service provides lifestyle suggestions only and is not medical advice."

class WeeklySummary(BaseModel):
    start_date: str
    end_date: str
    average_sleep: float
    total_steps: int
    average_mood_score: float
    summary_text: str
    chart_paths: List[str]

class Memory(BaseModel):
    user_id: str
    habits: List[str]
    last_updated: datetime = Field(default_factory=datetime.utcnow)
