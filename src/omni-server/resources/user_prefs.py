from server import mcp

@mcp.resource("prefs://user")
def get_preferences() -> str:
    """Provides user preferences as a resource."""
    return "Preferred format: JSON\nTimezone: UTC"