from mcp.server.fastmcp import FastMCP

mcp = FastMCP("omni_server")

# Import and register tools
from tools import summarize_csv_file, get_weather, query_tasks
mcp.tool()(summarize_csv_file)
mcp.tool()(query_tasks)
mcp.tool()(get_weather)

# Import and register resources
from resources import get_schema, get_preferences
mcp.resource("schema://tasks")(get_schema) 
mcp.resource("prefs://user")(get_preferences)

# Import and register prompts
from prompts import task_summary_prompt
mcp.prompt()(task_summary_prompt)

import sys

print("Registering tools and resources...", file=sys.stderr)
# After registering tools
print(f"Registered tools: {mcp.tools._tools}", file=sys.stderr)
# After registering resources
print(f"Registered resources: {mcp.resources._resources}", file=sys.stderr)
# After prompts resources
print(f"Registered resources: {mcp.prompts._prompts}", file=sys.stderr)