from motor.motor_asyncio import AsyncIOMotorClient
from backend.config import settings
from backend.models.schemas import DailyLog, Memory
from datetime import datetime

client = AsyncIOMotorClient(settings.MONGO_URI)
db = client.wellness_db
logs_collection = db.logs
memories_collection = db.memories

async def save_log(log: DailyLog):
    log_dict = log.dict()
    # Upsert based on user_id and date
    await logs_collection.update_one(
        {"user_id": log.user_id, "date": log.date},
        {"$set": log_dict},
        upsert=True
    )

async def get_logs(user_id: str, limit: int = 7):
    cursor = logs_collection.find({"user_id": user_id}).sort("date", -1).limit(limit)
    logs = await cursor.to_list(length=limit)
    return logs

async def get_memory(user_id: str):
    memory = await memories_collection.find_one({"user_id": user_id})
    if memory:
        return Memory(**memory)
    return None

async def update_memory(user_id: str, habits: list):
    await memories_collection.update_one(
        {"user_id": user_id},
        {"$set": {"habits": habits, "last_updated": datetime.utcnow()}},
        upsert=True
    )
