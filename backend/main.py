from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import logs, plan, reminders, analytics, auth, memory
from backend.utils.scheduler import start_scheduler, stop_scheduler

app = FastAPI(
    title="AI Health & Wellness Concierge",
    description="Non-medical lifestyle agent for daily planning and wellness tracking.",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router)
app.include_router(logs.router)
app.include_router(plan.router)
app.include_router(reminders.router)
app.include_router(analytics.router)
app.include_router(memory.router)

@app.on_event("startup")
async def startup_event():
    start_scheduler()

@app.on_event("shutdown")
async def shutdown_event():
    stop_scheduler()

@app.get("/")
async def root():
    return {"message": "Welcome to AI Health & Wellness Concierge"}