#!/bin/bash

# Demo script for AI Health & Wellness Concierge

echo "Starting Demo..."
echo "Ensure the backend is running (e.g., via docker-compose up or uvicorn)"

BASE_URL="http://localhost:8000"

# 1. Post Sample Logs
echo "Posting sample logs..."
# Using python to post logs from json file would be cleaner, but using curl for simplicity as requested
# We'll just post one log for demo purposes
curl -X POST "$BASE_URL/logs/" \
     -H "Content-Type: application/json" \
     -d '{
           "user_id": "demo_user",
           "date": "2023-11-01",
           "sleep_hours": 7.5,
           "steps": 8500,
           "meals": ["Oatmeal", "Salad", "Chicken"],
           "water_intake": 2.5,
           "mood": "Happy"
         }'

echo -e "\n\nLog posted."

# 2. Get Daily Plan
echo "Fetching daily plan..."
curl -X GET "$BASE_URL/plan/?user_id=demo_user&date=2023-11-01"

echo -e "\n\nPlan fetched."

# 3. Get Weekly Analytics
echo "Fetching weekly analytics..."
curl -X GET "$BASE_URL/analytics/weekly?user_id=demo_user"

echo -e "\n\nAnalytics fetched."
echo "Demo complete."
