import matplotlib.pyplot as plt
import os
from typing import List, Dict
import pandas as pd

OUTPUT_DIR = "analytics_outputs"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def generate_charts(logs: List[Dict], user_id: str) -> List[str]:
    if not logs:
        return []
        
    df = pd.DataFrame(logs)
    df['date'] = pd.to_datetime(df['date'])
    df = df.sort_values('date')
    
    chart_paths = []
    
    # Sleep Chart
    plt.figure(figsize=(10, 5))
    plt.plot(df['date'], df['sleep_hours'], marker='o')
    plt.title('Weekly Sleep Trends')
    plt.xlabel('Date')
    plt.ylabel('Hours')
    plt.grid(True)
    sleep_path = os.path.join(OUTPUT_DIR, f"{user_id}_sleep.png")
    plt.savefig(sleep_path)
    plt.close()
    chart_paths.append(sleep_path)
    
    # Steps Chart
    plt.figure(figsize=(10, 5))
    plt.bar(df['date'], df['steps'])
    plt.title('Weekly Steps')
    plt.xlabel('Date')
    plt.ylabel('Steps')
    steps_path = os.path.join(OUTPUT_DIR, f"{user_id}_steps.png")
    plt.savefig(steps_path)
    plt.close()
    chart_paths.append(steps_path)
    
    return chart_paths
