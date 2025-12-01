from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGO_URI: str
    LLM_API_KEY: str
    CALENDAR_CLIENT_ID: str
    CALENDAR_CLIENT_SECRET: str
    JWT_SECRET: str
    OPENWEATHER_API_KEY: str
    
    class Config:
        env_file = ".env"

settings = Settings()
