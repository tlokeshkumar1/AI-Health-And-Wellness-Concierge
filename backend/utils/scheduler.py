from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger

scheduler = AsyncIOScheduler()

def start_scheduler():
    scheduler.start()

def stop_scheduler():
    scheduler.shutdown()
