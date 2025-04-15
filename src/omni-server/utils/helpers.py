import pandas as pd
import sqlite3
import requests
from dotenv import load_dotenv
import os

load_dotenv()

def summarize_file(filename: str) -> str:
    try:
        df = pd.read_csv(f"data/{filename}")
        return (
            f"File '{filename}' has {len(df)} rows and columns: {list(df.columns)}.\n"
            f"First row: {df.iloc[0].to_dict()}"
        )
    except Exception as e:
        return f"Error summarizing file: {str(e)}"

def query_database(sql: str) -> str:
    try:
        conn = sqlite3.connect("data/tasks.db")
        df = pd.read_sql_query(sql, conn)
        conn.close()
        return (
            f"Query returned {len(df)} rows.\n"
            f"Columns: {list(df.columns)}\n"
            f"First row: {df.iloc[0].to_dict() if not df.empty else 'No data'}"
        )
    except Exception as e:
        return f"Error querying database: {str(e)}"

def fetch_weather(city: str) -> str:
    api_key = os.getenv("OPENWEATHER_API_KEY")
    if not api_key:
        return "Error: API key not found."
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return (
            f"Weather in {city}:\n"
            f"Temperature: {data['main']['temp']}°C\n"
            f"Condition: {data['weather'][0]['description']}"
        )
    except requests.RequestException as e:
        return f"Error fetching weather: {str(e)}"