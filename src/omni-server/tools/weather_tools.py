from mcp.server.fastmcp import Context
from utils.helpers import fetch_weather

async def get_weather(city: str, context: Context) -> str:
    """Fetches real-time weather for a city using an external API."""
    weather = fetch_weather(city)
    # Simulate context injection: log progress
    await context.report_progress("weather_fetch", 100, 100, "Weather fetched")
    return weather