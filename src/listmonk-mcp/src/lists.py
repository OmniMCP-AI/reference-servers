# src/lists.py
# Handlers for Listmonk list-related MCP tools

import requests
import json
import sys
from requests.auth import HTTPBasicAuth
import asyncio
# Import the centralized request function
from src.client import make_request
# Note: MCP types would be imported from the SDK if used

# --- Tool Definitions ---

get_list_schema = {
    "type": "object",
    "properties": {
        "list_id": {"type": "integer", "description": "The ID of the list to retrieve."}
    },
    "required": ["list_id"]
}

list_lists_schema = {
    "type": "object",
    "properties": {
        "query": {"type": "string", "description": "String for list name search."},
        "status": {"type": "array", "items": {"type": "string"}, "description": "Status to filter lists (e.g., ['private', 'public'])."},
        "tag": {"type": "array", "items": {"type": "string"}, "description": "Tags to filter lists."},
        "order_by": {"type": "string", "enum": ["name", "status", "created_at", "updated_at"], "description": "Field to sort results by."},
        "order": {"type": "string", "enum": ["ASC", "DESC"], "description": "Sort order."},
        "page": {"type": "integer", "description": "Page number for pagination.", "default": 1},
        "per_page": {"type": ["integer", "string"], "description": "Results per page. Use 'all' for all results.", "default": 100}
    },
    "required": []
}

create_list_schema = {
    "type": "object",
    "properties": {
        "name": {"type": "string", "description": "Name of the new list."},
        "type": {"type": "string", "enum": ["private", "public"], "description": "Type of list."},
        "optin": {"type": "string", "enum": ["single", "double"], "description": "Opt-in type."},
        "tags": {"type": "array", "items": {"type": "string"}, "description": "Optional associated tags."},
        "description": {"type": "string", "description": "Optional description of the list."}
    },
    "required": ["name", "type", "optin"]
}

update_list_schema = {
    "type": "object",
    "properties": {
        "list_id": {"type": "integer", "description": "The ID of the list to update."},
        "name": {"type": "string", "description": "Optional: New name for the list."},
        "type": {"type": "string", "enum": ["private", "public"], "description": "Optional: New type."},
        "optin": {"type": "string", "enum": ["single", "double"], "description": "Optional: New opt-in type."},
        "tags": {"type": "array", "items": {"type": "string"}, "description": "Optional: New list of tags (replaces existing)."},
        "description": {"type": "string", "description": "Optional: New description."}
    },
    "required": ["list_id"]
}

delete_list_schema = {
    "type": "object",
    "properties": {
        "list_id": {"type": "integer", "description": "The ID of the list to delete."}
    },
    "required": ["list_id"]
}

LIST_TOOLS = [
    {
        "name": "get_list",
        "description": "Retrieve a specific list by ID.",
        "inputSchema": get_list_schema
    },
    {
        "name": "list_lists",
        "description": "List and query lists based on various filters.",
        "inputSchema": list_lists_schema
    },
    {
        "name": "create_list",
        "description": "Create a new list.",
        "inputSchema": create_list_schema
    },
    {
        "name": "update_list",
        "description": "Update an existing list.",
        "inputSchema": update_list_schema
    },
    {
        "name": "delete_list",
        "description": "Delete a list.",
        "inputSchema": delete_list_schema
    },
]

# --- Tool Handler Functions ---

async def handle_get_list(arguments: dict):
    """Handles the 'get_list' MCP tool call."""
    print(f"Handling get_list with args: {arguments}")
    list_id = arguments.get("list_id")
    if not isinstance(list_id, int):
        return {"content": [{"type": "text", "text": "Error: Missing or invalid 'list_id' (must be an integer)."}], "isError": True}

    return await make_request("GET", f"/lists/{list_id}")

async def handle_list_lists(arguments: dict):
    """Handles the 'list_lists' MCP tool call."""
    print(f"Handling list_lists with args: {arguments}")
    params = {}
    # Map MCP arguments to Listmonk API query parameters
    if "query" in arguments: params["query"] = arguments["query"]
    if "status" in arguments: params["status"] = arguments["status"] # requests handles lists
    if "tag" in arguments: params["tag"] = arguments["tag"] # requests handles lists
    if "order_by" in arguments: params["order_by"] = arguments["order_by"]
    if "order" in arguments: params["order"] = arguments["order"]
    params["page"] = arguments.get("page", 1)
    params["per_page"] = arguments.get("per_page", 100)

    return await make_request("GET", "/lists", params=params)

async def handle_create_list(arguments: dict):
    """Handles the 'create_list' MCP tool call."""
    print(f"Handling create_list with args: {arguments}")
    required_args = ["name", "type", "optin"]
    if not all(arg in arguments for arg in required_args):
        return {"content": [{"type": "text", "text": f"Error: Missing required arguments: {required_args}"}], "isError": True}

    payload = {
        "name": arguments["name"],
        "type": arguments["type"],
        "optin": arguments["optin"],
    }
    if "tags" in arguments: payload["tags"] = arguments["tags"]
    if "description" in arguments: payload["description"] = arguments["description"]

    return await make_request("POST", "/lists", data=payload)

async def handle_update_list(arguments: dict):
    """Handles the 'update_list' MCP tool call."""
    print(f"Handling update_list with args: {arguments}")
    list_id = arguments.get("list_id")
    if not isinstance(list_id, int):
        return {"content": [{"type": "text", "text": "Error: Missing or invalid 'list_id' (must be an integer)."}], "isError": True}

    payload = {}
    if "name" in arguments: payload["name"] = arguments["name"]
    if "type" in arguments: payload["type"] = arguments["type"]
    if "optin" in arguments: payload["optin"] = arguments["optin"]
    if "tags" in arguments: payload["tags"] = arguments["tags"] # This will replace existing tags
    if "description" in arguments: payload["description"] = arguments["description"]

    if not payload:
         return {"content": [{"type": "text", "text": "Error: At least one field (name, type, optin, tags, description) must be provided for update."}], "isError": True}

    # Note: API.md example uses form data, but trying JSON first.
    return await make_request("PUT", f"/lists/{list_id}", data=payload)

async def handle_delete_list(arguments: dict):
    """Handles the 'delete_list' MCP tool call."""
    print(f"Handling delete_list with args: {arguments}")
    list_id = arguments.get("list_id")
    if not isinstance(list_id, int):
        return {"content": [{"type": "text", "text": "Error: Missing or invalid 'list_id' (must be an integer)."}], "isError": True}

    return await make_request("DELETE", f"/lists/{list_id}")

# --- Router ---
LIST_TOOL_HANDLERS = {
    "get_list": handle_get_list,
    "list_lists": handle_list_lists,
    "create_list": handle_create_list,
    "update_list": handle_update_list,
    "delete_list": handle_delete_list,
}

async def route_list_tool(tool_name: str, arguments: dict):
    """Routes a list tool call to the appropriate handler."""
    handler = LIST_TOOL_HANDLERS.get(tool_name)
    if handler:
        return await handler(arguments)
    else:
        error_message = f"Error: Unknown list tool '{tool_name}'"
        print(error_message, file=sys.stderr)
        return {"content": [{"type": "text", "text": error_message}], "isError": True}

# --- Test Execution Block / CLI Handler ---
if __name__ == "__main__":
    import asyncio
    import argparse

    parser = argparse.ArgumentParser(description="Run Listmonk list functions directly.")
    parser.add_argument("function", choices=list(LIST_TOOL_HANDLERS.keys()), help="The list function to execute.")
    parser.add_argument("arguments_json", help="JSON string containing the arguments for the function.")

    cli_args = parser.parse_args()

    try:
        arguments = json.loads(cli_args.arguments_json)
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON provided for arguments: {e}", file=sys.stderr)
        sys.exit(1)

    async def run_specific_function():
        print(f"--- Running list function '{cli_args.function}' with args: {arguments} ---")
        result = await route_list_tool(cli_args.function, arguments)
        print(f"\n--- Result ---")
        print(json.dumps(result, indent=2))
        print("--- Execution Complete ---")
        if result.get("isError"):
            sys.exit(1)

    asyncio.run(run_specific_function())
