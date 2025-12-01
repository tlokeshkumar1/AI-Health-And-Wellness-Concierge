import httpx
from backend.config import settings

async def get_weather(location: str = "New York") -> str:
    if settings.OPENWEATHER_API_KEY == "mock_weather_key":
        return "Sunny, 25°C"
    
    # Placeholder for real API call
    # url = f"http://api.openweathermap.org/data/2.5/weather?q={location}&appid={settings.OPENWEATHER_API_KEY}"
    # async with httpx.AsyncClient() as client:
    #     resp = await client.get(url)
    #     data = resp.json()
    #     return f"{data['weather'][0]['description']}, {data['main']['temp'] - 273.15:.1f}°C"
        
    return "Sunny, 25°C"
