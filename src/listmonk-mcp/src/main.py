# src/main.py
# Main entry point for the Listmonk MCP Server

import json
import os
import sys
import asyncio
from dotenv import load_dotenv

# Load environment variables from .env file if it exists
# Variables set by the MCP host environment will take precedence
load_dotenv()

# Import tool definitions and routers from resource modules
from src.subscribers import SUBSCRIBER_TOOLS, route_subscriber_tool
from src.lists import LIST_TOOLS, route_list_tool
from src.campaigns import CAMPAIGN_TOOLS, route_campaign_tool
from src.templates import TEMPLATE_TOOLS, route_template_tool
from src.bounces import BOUNCE_TOOLS, route_bounce_tool
from src.transactional import TRANSACTIONAL_TOOLS, route_transactional_tool

# --- Configuration ---
# Load from environment variables.
# These should be set either by the system environment, the .env file,
# or the MCP host's configuration (like cline_mcp_settings.json).
# We remove the hardcoded defaults to ensure credentials are provided externally.
LISTMONK_ENDPOINT = os.getenv("LISTMONK_API_ENDPOINT")
API_USER = os.getenv("LISTMONK_API_USER")
API_TOKEN = os.getenv("LISTMONK_API_TOKEN")

# Basic validation on startup
if not all([LISTMONK_ENDPOINT, API_USER, API_TOKEN]):
    print("Error: Missing required environment variables: LISTMONK_API_ENDPOINT, LISTMONK_API_USER, LISTMONK_API_TOKEN", file=sys.stderr)
    print("Please set them in your environment or a .env file.", file=sys.stderr)
    sys.exit(1)


# --- Tool Definitions ---
# Combine tool definitions from all modules
ALL_TOOLS = SUBSCRIBER_TOOLS + LIST_TOOLS + CAMPAIGN_TOOLS + TEMPLATE_TOOLS + BOUNCE_TOOLS + TRANSACTIONAL_TOOLS

# --- Tool Handlers ---
# Map tool names to their routing functions from specific modules
TOOL_HANDLERS = {}
for tool in SUBSCRIBER_TOOLS:
    TOOL_HANDLERS[tool["name"]] = route_subscriber_tool
for tool in LIST_TOOLS:
    TOOL_HANDLERS[tool["name"]] = route_list_tool
for tool in CAMPAIGN_TOOLS:
    TOOL_HANDLERS[tool["name"]] = route_campaign_tool
for tool in TEMPLATE_TOOLS:
    TOOL_HANDLERS[tool["name"]] = route_template_tool
for tool in BOUNCE_TOOLS:
    TOOL_HANDLERS[tool["name"]] = route_bounce_tool
for tool in TRANSACTIONAL_TOOLS:
    TOOL_HANDLERS[tool["name"]] = route_transactional_tool

# --- MCP Server Implementation ---

async def handle_mcp_request(request: dict):
    """
    Handles an incoming MCP request dictionary.
    Determines the tool and calls the appropriate handler.
    """
    tool_name = request.get("tool_name")
    arguments = request.get("arguments", {})

    if not tool_name:
        # Note: Proper McpError from SDK would be used here
        return {"content": [{"type": "text", "text": "Error: Missing 'tool_name' in request."}], "isError": True}

    # Find the correct routing function based on the tool name
    handler_router = TOOL_HANDLERS.get(tool_name)

    if not handler_router:
        # Note: Proper McpError (MethodNotFound) from SDK would be used here
        return {"content": [{"type": "text", "text": f"Error: Unknown tool '{tool_name}'."}], "isError": True}

    # Call the specific router function (which will call the actual handler)
    # Note: The router functions (route_subscriber_tool, route_list_tool)
    # currently handle unknown tools within their scope as well.
    try:
        # Ensure arguments is a dict, default to empty if null/missing
        if arguments is None:
            arguments = {}
        elif not isinstance(arguments, dict):
             return {"content": [{"type": "text", "text": f"Error: Invalid 'arguments' format for tool '{tool_name}'. Expected a JSON object."}], "isError": True}

        result = await handler_router(tool_name, arguments)
        return result
    except Exception as e:
        # Catch-all for unexpected errors during handler execution
        error_message = f"Error executing tool '{tool_name}': {e}"
        print(error_message, file=sys.stderr)
        # Note: Proper McpError (InternalError) from SDK would be used here
        return {"content": [{"type": "text", "text": error_message}], "isError": True}


async def main_loop():
    """
    Main event loop to read MCP requests from stdin and write responses to stdout.
    """
    print("Listmonk MCP Server Ready. Waiting for requests...", file=sys.stderr)
    while True:
        try:
            line = sys.stdin.readline()
            if not line:
                print("Stdin closed. Exiting.", file=sys.stderr)
                break # End of input

            print(f"Received line: {line.strip()}", file=sys.stderr) # Debug input
            request = json.loads(line)
            print(f"Parsed Request: {request}", file=sys.stderr) # Debug parsed request

            response = await handle_mcp_request(request)
            print(f"Sending Response: {response}", file=sys.stderr) # Debug response

            # Write response to stdout (ensure newline for MCP host)
            print(json.dumps(response), flush=True)

        except json.JSONDecodeError as e:
            error_message = f"Error decoding JSON request: {e}. Line: '{line.strip()}'"
            print(error_message, file=sys.stderr)
            # Send error response back to host
            error_response = {"content": [{"type": "text", "text": error_message}], "isError": True}
            print(json.dumps(error_response), flush=True)
        except Exception as e:
            # Catch other unexpected errors in the main loop
            error_message = f"Unexpected error in main loop: {e}"
            print(error_message, file=sys.stderr)
            error_response = {"content": [{"type": "text", "text": error_message}], "isError": True}
            print(json.dumps(error_response), flush=True)
            # Consider whether to break the loop on certain errors

if __name__ == "__main__":
    # The server directly enters the MCP request handling loop when run.
    # To test individual functions, use the CLI handlers in the respective
    # resource files (e.g., python src/subscribers.py get '{"subscriber_id": 1}')
    try:
        asyncio.run(main_loop())
    except KeyboardInterrupt:
        print("\nServer interrupted. Exiting.", file=sys.stderr)
