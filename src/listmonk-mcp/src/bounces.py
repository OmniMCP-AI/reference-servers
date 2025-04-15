# src/bounces.py
# Handlers for Listmonk bounce-related MCP tools

import requests
import json
import sys
from requests.auth import HTTPBasicAuth
import asyncio
# Import the centralized request function
from src.client import make_request
# Note: MCP types would be imported from the SDK if used

# --- Tool Definitions ---

list_bounces_schema = {
    "type": "object",
    "properties": {
        "campaign_id": {"type": "integer", "description": "Optional: Filter bounces by campaign ID."},
        "page": {"type": "integer", "description": "Page number for pagination.", "default": 1},
        "per_page": {"type": ["integer", "string"], "description": "Results per page. Use 'all' for all results.", "default": 100},
        "source": {"type": "string", "description": "Optional: Filter by bounce source."},
        "order_by": {"type": "string", "enum": ["email", "campaign_name", "source", "created_at"], "description": "Field to sort results by."},
        "order": {"type": "string", "enum": ["asc", "desc"], "description": "Sort order."} # API.md says number, but example shows string 'asc'/'desc'
    },
    "required": []
}

delete_bounces_schema = {
    "type": "object",
    "properties": {
        "ids": {"type": "array", "items": {"type": "integer"}, "description": "Array of bounce record IDs to delete."},
        "all": {"type": "boolean", "description": "Set to true to delete all bounce records (ignores ids)."}
    },
    "required": [], # Either 'ids' or 'all' must be provided, checked in handler
    "oneOf": [ # Ensure at least one is provided
        {"required": ["ids"]},
        {"required": ["all"]}
    ]
}

delete_bounce_schema = {
    "type": "object",
    "properties": {
        "bounce_id": {"type": "integer", "description": "The ID of the specific bounce record to delete."}
    },
    "required": ["bounce_id"]
}

BOUNCE_TOOLS = [
    {"name": "list_bounces", "description": "Retrieve bounce records.", "inputSchema": list_bounces_schema},
    {"name": "delete_bounces", "description": "Delete multiple or all bounce records.", "inputSchema": delete_bounces_schema},
    {"name": "delete_bounce", "description": "Delete a specific bounce record.", "inputSchema": delete_bounce_schema},
]

# --- Tool Handler Functions ---

async def handle_list_bounces(arguments: dict):
    """Handles the 'list_bounces' MCP tool call."""
    print(f"Handling list_bounces with args: {arguments}")
    params = {}
    if "campaign_id" in arguments: params["campaign_id"] = arguments["campaign_id"]
    params["page"] = arguments.get("page", 1)
    params["per_page"] = arguments.get("per_page", 100)
    if "source" in arguments: params["source"] = arguments["source"]
    if "order_by" in arguments: params["order_by"] = arguments["order_by"]
    if "order" in arguments: params["order"] = arguments["order"]
    return await make_request("GET", "/bounces", params=params)

async def handle_delete_bounces(arguments: dict):
    """Handles the 'delete_bounces' MCP tool call."""
    print(f"Handling delete_bounces with args: {arguments}")
    params = {}
    if arguments.get("all"):
        params["all"] = "true"
    elif "ids" in arguments and isinstance(arguments["ids"], list) and arguments["ids"]:
        params["id"] = arguments["ids"] # API expects repeated 'id' query param
    else:
        return {"content": [{"type": "text", "text": "Error: Either 'ids' (non-empty array) or 'all=true' must be provided."}], "isError": True}

    return await make_request("DELETE", "/bounces", params=params)

async def handle_delete_bounce(arguments: dict):
    """Handles the 'delete_bounce' MCP tool call."""
    print(f"Handling delete_bounce with args: {arguments}")
    bounce_id = arguments.get("bounce_id")
    if not isinstance(bounce_id, int):
        return {"content": [{"type": "text", "text": "Error: Missing or invalid 'bounce_id'."}], "isError": True}
    return await make_request("DELETE", f"/bounces/{bounce_id}")

# --- Router ---
BOUNCE_TOOL_HANDLERS = {
    "list_bounces": handle_list_bounces,
    "delete_bounces": handle_delete_bounces,
    "delete_bounce": handle_delete_bounce,
}

async def route_bounce_tool(tool_name: str, arguments: dict):
    """Routes a bounce tool call to the appropriate handler."""
    handler = BOUNCE_TOOL_HANDLERS.get(tool_name)
    if handler:
        return await handler(arguments)
    else:
        error_message = f"Error: Unknown bounce tool '{tool_name}'"
        print(error_message, file=sys.stderr)
        return {"content": [{"type": "text", "text": error_message}], "isError": True}

# --- Test Execution Block / CLI Handler ---
if __name__ == "__main__":
    import asyncio
    import argparse

    parser = argparse.ArgumentParser(description="Run Listmonk bounce functions directly.")
    parser.add_argument("function", choices=list(BOUNCE_TOOL_HANDLERS.keys()), help="The bounce function to execute.")
    parser.add_argument("arguments_json", help="JSON string containing the arguments for the function.")

    cli_args = parser.parse_args()

    try:
        arguments = json.loads(cli_args.arguments_json)
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON provided for arguments: {e}", file=sys.stderr)
        sys.exit(1)

    async def run_specific_function():
        print(f"--- Running bounce function '{cli_args.function}' with args: {arguments} ---")
        result = await route_bounce_tool(cli_args.function, arguments)
        print(f"\n--- Result ---")
        print(json.dumps(result, indent=2))
        print("--- Execution Complete ---")
        if result.get("isError"):
            sys.exit(1)

    asyncio.run(run_specific_function())
