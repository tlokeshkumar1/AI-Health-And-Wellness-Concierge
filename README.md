# AI Health & Wellness Concierge (Non-Medical Lifestyle Agent)

> [!IMPORTANT]
> **Disclaimer**: This service provides lifestyle suggestions only and is not medical advice. If you have a medical condition, please consult a professional.

## Overview

This project is an AI-powered Health & Wellness Concierge designed to provide personalized daily plans and weekly analytics based on user logs. It features:

- **Wellness Planner Agent**: Generates daily plans (hydration, workout, meals) using LLM.
- **Habit Memory Agent**: Tracks long-term habits and patterns.
- **Weekly Analytics Agent**: Generates weekly reports and charts.
- **MCP Tool Connectors**: Integrates with File, Calendar, Database, and Browser tools.

## Architecture

```mermaid
graph TD
    User[User] -->|POST /logs| API[FastAPI Backend]
    User -->|GET /plan| API
    User -->|GET /analytics| API
    
    API -->|Save/Read| DB[(MongoDB)]
    API -->|Trigger| MemoryAgent[Habit Memory Agent]
    API -->|Request Plan| WellnessAgent[Wellness Planner Agent]
    API -->|Request Report| AnalyticsAgent[Weekly Analytics Agent]
    
    WellnessAgent -->|Fetch Weather| BrowserTool[Browser Tool]
    WellnessAgent -->|Read History| DB
    WellnessAgent -->|Generate| LLM[LLM (Gemini/Mock)]
    
    AnalyticsAgent -->|Compute| Pandas[Pandas Analytics]
    AnalyticsAgent -->|Draw| Matplotlib[Matplotlib Charts]
    
    MemoryAgent -->|Update| DB
```

## Setup & Installation

### Prerequisites
- Python 3.11+
- Docker & Docker Compose (optional)
- MongoDB (local or via Docker)

### Local Setup

1.  **Clone the repository**
    ```bash
    git clone <repo_url>
    cd ai-wellness-concierge
    ```

2.  **Create Virtual Environment**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3.  **Install Dependencies**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Environment Configuration**
    Copy `.env.example` to `.env` and update keys if needed.
    ```bash
    cp .env.example .env
    ```
    *Note: The project runs in `mock` mode by default if no API keys are provided.*

5.  **Run MongoDB**
    Ensure MongoDB is running locally on port 27017.

6.  **Start Backend**
    ```bash
    uvicorn backend.main:app --reload
    ```

### Docker Setup

1.  **Build and Run**
    ```bash
    docker-compose up --build
    ```
    The API will be available at `http://localhost:8000`.

## API Endpoints

-   `POST /logs/`: Submit a daily log.
-   `GET /plan/`: Get a daily wellness plan.
-   `POST /reminders/`: Create calendar reminders.
-   `GET /analytics/weekly`: Get weekly summary and charts.

## Testing

Run unit tests:
```bash
pytest
```

## Demo

A demo script is provided in `scripts/demo.sh`. It requires the server to be running.

```bash
# On Windows (Git Bash) or Linux
./scripts/demo.sh
```

## License

MIT
