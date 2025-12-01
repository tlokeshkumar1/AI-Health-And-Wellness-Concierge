import os
import json
from typing import Dict, Any
from backend.config import settings

class LLMClient:
    def __init__(self):
        self.api_key = settings.LLM_API_KEY
        self.provider = "mock"  # Default to mock if key is placeholder
        if self.api_key and self.api_key != "your_api_key_here":
            self.provider = "gemini" # Or openai, logic to detect

    async def generate_response(self, prompt: str, system_instruction: str = None) -> Dict[str, Any]:
        if self.provider == "mock":
            return self._mock_response(prompt)
        
        # Placeholder for real API call
        # if self.provider == "gemini":
        #     return await self._call_gemini(prompt, system_instruction)
            
        return self._mock_response(prompt)

    def _mock_response(self, prompt: str) -> Dict[str, Any]:
        # Return a deterministic JSON based on prompt keywords or just a generic one
        return {
            "hydration_goal": "2.5 liters",
            "workout": "30 mins brisk walking",
            "meals": "Oatmeal for breakfast, Salad for lunch, Grilled fish for dinner",
            "break_reminders": ["10:00 AM", "2:00 PM", "4:00 PM"],
            "mood_support": "Great job staying consistent! Keep it up.",
            "sleep_tip": "Avoid screens 1 hour before bed.",
            "weather_tip": "It's sunny, perfect for a walk!",
            "disclaimer": "This service provides lifestyle suggestions only and is not medical advice."
        }

llm_client = LLMClient()
