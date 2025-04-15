# src/subscribers.py
# Handlers for Listmonk subscriber-related MCP tools

import requests
import json
import sys
from requests.auth import HTTPBasicAuth
import asyncio
# Import the centralized request function
from src.client import make_request
# Note: MCP types would be imported from the SDK if used

# --- Tool Definitions (Example Structure) ---

# Define JSON Schemas for each tool's input arguments
list_subscribers_schema = {
    "type": "object",
    "properties": {
        "query": {"type": "string", "description": "SQL-like query string to filter subscribers."},
        "list_id": {"type": "array", "items": {"type": "integer"}, "description": "Array of list IDs to filter by."},
        "subscription_status": {"type": "string", "description": "Subscription status to filter by (used with list_id)."},
        "order_by": {"type": "string", "enum": ["name", "status", "created_at", "updated_at"], "description": "Field to sort results by."},
        "order": {"type": "string", "enum": ["ASC", "DESC"], "description": "Sort order."},
        "page": {"type": "integer", "description": "Page number for pagination.", "default": 1},
        "per_page": {"type": ["integer", "string"], "description": "Results per page. Use 'all' for all results.", "default": 100}
    },
    "required": []
}

get_subscriber_schema = {
    "type": "object",
    "properties": {
        "subscriber_id": {"type": "integer", "description": "The ID of the subscriber to retrieve."}
    },
    "required": ["subscriber_id"]
}

create_subscriber_schema = {
    "type": "object",
    "properties": {
        "email": {"type": "string", "description": "Subscriber's email address."},
        "name": {"type": "string", "description": "Subscriber's name."},
        "status": {"type": "string", "enum": ["enabled", "blocklisted"], "description": "Subscriber's status."},
        "lists": {"type": "array", "items": {"type": "integer"}, "description": "Optional array of list IDs to subscribe to."},
        "attribs": {"type": "object", "description": "Optional JSON object of subscriber attributes."},
        "preconfirm_subscriptions": {"type": "boolean", "description": "Optional flag to mark subscriptions as confirmed immediately.", "default": False}
    },
    "required": ["email", "name", "status"]
}

update_subscriber_schema = {
    "type": "object",
    "properties": {
        "subscriber_id": {"type": "integer", "description": "The ID of the subscriber to update."},
        "email": {"type": "string", "description": "Optional: New email address."},
        "name": {"type": "string", "description": "Optional: New name."},
        "status": {"type": "string", "enum": ["enabled", "blocklisted"], "description": "Optional: New status."},
        "lists": {"type": "array", "items": {"type": "integer"}, "description": "Optional: New array of list IDs."},
        "attribs": {"type": "object", "description": "Optional: New JSON object of attributes. Replaces existing attributes."},
        "preconfirm_subscriptions": {"type": "boolean", "description": "Optional: New preconfirm flag."}
    },
    "required": ["subscriber_id"]
}

delete_subscriber_schema = {
    "type": "object",
    "properties": {
        "subscriber_id": {"type": "integer", "description": "The ID of the subscriber to delete."}
    },
    "required": ["subscriber_id"]
}

blocklist_subscriber_schema = {
    "type": "object",
    "properties": {
        "subscriber_id": {"type": "integer", "description": "The ID of the subscriber to blocklist."}
    },
    "required": ["subscriber_id"]
}

manage_subscriber_lists_schema = {
    "type": "object",
    "properties": {
        "ids": {"type": "array", "items": {"type": "integer"}, "description": "Array of subscriber IDs to modify."},
        "action": {"type": "string", "enum": ["add", "remove", "unsubscribe"], "description": "Action to perform."},
        "target_list_ids": {"type": "array", "items": {"type": "integer"}, "description": "Array of list IDs to modify membership for."},
        "status": {"type": "string", "enum": ["confirmed", "unconfirmed", "unsubscribed"], "description": "Required status for 'add' action."}
    },
    "required": ["ids", "action", "target_list_ids"] # Status is conditionally required by API, but let's enforce it for 'add' in handler
}


# Store tool definitions (name, description, schema) - could be loaded by main.py
SUBSCRIBER_TOOLS = [
    {
        "name": "list_subscribers",
        "description": "List and query subscribers based on various filters.",
        "inputSchema": list_subscribers_schema
    },
    {
        "name": "get_subscriber",
        "description": "Get details for a specific subscriber by ID.",
        "inputSchema": get_subscriber_schema
    },
    {
        "name": "create_subscriber",
        "description": "Create a new subscriber.",
        "inputSchema": create_subscriber_schema
    },
    {
        "name": "update_subscriber",
        "description": "Update an existing subscriber.",
        "inputSchema": update_subscriber_schema
    },
    {
        "name": "delete_subscriber",
        "description": "Delete a subscriber.",
        "inputSchema": delete_subscriber_schema
    },
    {
        "name": "blocklist_subscriber",
        "description": "Blocklist a specific subscriber.",
        "inputSchema": blocklist_subscriber_schema
    },
    {
        "name": "manage_subscriber_lists",
        "description": "Add, remove, or unsubscribe multiple subscribers from multiple lists.",
        "inputSchema": manage_subscriber_lists_schema
    },
]

# --- Tool Handler Functions ---

# Note: In a real MCP server, these functions would likely receive context
# containing the configured API endpoint and credentials. For now, using module-level placeholders.
# Also, MCP SDK provides error classes like McpError. We simulate error returns for now.

async def handle_list_subscribers(arguments: dict):
    """Handles the 'list_subscribers' MCP tool call."""
    print(f"Handling list_subscribers with args: {arguments}")
    params = {}
    # Map MCP arguments to Listmonk API query parameters
    if "query" in arguments:
        params["query"] = arguments["query"]
    if "list_id" in arguments: # API expects list_id repeated, requests handles lists automatically
        params["list_id"] = arguments["list_id"]
    if "subscription_status" in arguments:
        params["subscription_status"] = arguments["subscription_status"]
    if "order_by" in arguments:
        params["order_by"] = arguments["order_by"]
    if "order" in arguments:
        params["order"] = arguments["order"]

    params["page"] = arguments.get("page", 1)
    params["per_page"] = arguments.get("per_page", 100) # Default to 100 as per API.md examples

    return await make_request("GET", "/subscribers", params=params)


async def handle_get_subscriber(arguments: dict):
    """Handles the 'get_subscriber' MCP tool call."""
    print(f"Handling get_subscriber with args: {arguments}")
    subscriber_id = arguments.get("subscriber_id")
    if not isinstance(subscriber_id, int):
         # Simulate McpError(ErrorCode.InvalidParams, ...)
        return {"content": [{"type": "text", "text": "Error: Missing or invalid 'subscriber_id' (must be an integer)."}], "isError": True}

    return await make_request("GET", f"/subscribers/{subscriber_id}")


async def handle_create_subscriber(arguments: dict):
    """Handles the 'create_subscriber' MCP tool call."""
    print(f"Handling create_subscriber with args: {arguments}")
    # Basic validation
    required_args = ["email", "name", "status"]
    if not all(arg in arguments for arg in required_args):
        return {"content": [{"type": "text", "text": f"Error: Missing required arguments: {required_args}"}], "isError": True}

    # Construct payload from arguments
    payload = {
        "email": arguments["email"],
        "name": arguments["name"],
        "status": arguments["status"],
    }
    if "lists" in arguments:
        payload["lists"] = arguments["lists"]
    if "attribs" in arguments:
        payload["attribs"] = arguments["attribs"]
    if "preconfirm_subscriptions" in arguments:
        payload["preconfirm_subscriptions"] = arguments["preconfirm_subscriptions"]

    return await make_request("POST", "/subscribers", data=payload)


# --- Add functions for other subscriber tools ---

async def handle_update_subscriber(arguments: dict):
    """Handles the 'update_subscriber' MCP tool call."""
    print(f"Handling update_subscriber with args: {arguments}")

    subscriber_id = arguments.get("subscriber_id")
    if not isinstance(subscriber_id, int):
        return {"content": [{"type": "text", "text": "Error: Missing or invalid 'subscriber_id' (must be an integer)."}], "isError": True}

    # API requires sending all fields. Fetch current data first.
    print(f"Fetching current data for subscriber {subscriber_id} before update...")
    current_data_response = await handle_get_subscriber({"subscriber_id": subscriber_id})
    if current_data_response.get("isError"):
        print(f"Error fetching current data: {current_data_response['content'][0]['text']}", file=sys.stderr)
        return current_data_response # Propagate the error

    try:
        current_data = current_data_response["content"][0]["json"]["data"]
        # The API PUT expects lists as an array of IDs, but GET returns list objects. Extract IDs.
        current_list_ids = [lst["id"] for lst in current_data.get("lists", [])]
    except (KeyError, IndexError, TypeError) as e:
        error_message = f"Error parsing current subscriber data: {e}"
        print(error_message, file=sys.stderr)
        return {"content": [{"type": "text", "text": error_message}], "isError": True}

    # Construct the payload, merging updates from arguments
    payload = {
        "email": arguments.get("email", current_data.get("email")),
        "name": arguments.get("name", current_data.get("name")),
        "status": arguments.get("status", current_data.get("status")),
        "lists": arguments.get("lists", current_list_ids), # Use updated lists if provided, else current
        "attribs": arguments.get("attribs", current_data.get("attribs")), # Note: API might overwrite, not merge, attribs
        # 'preconfirm_subscriptions' isn't returned by GET, handle optional update
    }
    if "preconfirm_subscriptions" in arguments:
         payload["preconfirm_subscriptions"] = arguments["preconfirm_subscriptions"]

    # Remove None values if any field wasn't present in current_data or args
    payload = {k: v for k, v in payload.items() if v is not None}

    # Ensure required fields for PUT are present (even if not changing, API might need them)
    # Based on error, 'lists' seems mandatory. Let's ensure it's always included if possible.
    if "lists" not in payload:
         # If we couldn't fetch lists and they weren't provided, we have to error out
         return {"content": [{"type": "text", "text": "Error: 'lists' field is required for subscriber update but could not be determined."}], "isError": True}


    return await make_request("PUT", f"/subscribers/{subscriber_id}", data=payload)


async def handle_delete_subscriber(arguments: dict):
    """Handles the 'delete_subscriber' MCP tool call."""
    print(f"Handling delete_subscriber with args: {arguments}")

    subscriber_id = arguments.get("subscriber_id")
    if not isinstance(subscriber_id, int):
        return {"content": [{"type": "text", "text": "Error: Missing or invalid 'subscriber_id' (must be an integer)."}], "isError": True}

    return await make_request("DELETE", f"/subscribers/{subscriber_id}")


async def handle_blocklist_subscriber(arguments: dict):
    """Handles the 'blocklist_subscriber' MCP tool call."""
    print(f"Handling blocklist_subscriber with args: {arguments}")

    subscriber_id = arguments.get("subscriber_id")
    if not isinstance(subscriber_id, int):
        return {"content": [{"type": "text", "text": "Error: Missing or invalid 'subscriber_id' (must be an integer)."}], "isError": True}

    # Blocklist API doesn't require a request body
    return await make_request("PUT", f"/subscribers/{subscriber_id}/blocklist")


async def handle_manage_subscriber_lists(arguments: dict):
    """Handles the 'manage_subscriber_lists' MCP tool call."""
    print(f"Handling manage_subscriber_lists with args: {arguments}")

    # Basic validation
    required_args = ["ids", "action", "target_list_ids"]
    if not all(arg in arguments for arg in required_args):
        return {"content": [{"type": "text", "text": f"Error: Missing required arguments: {required_args}"}], "isError": True}

    action = arguments["action"]
    if action == "add" and "status" not in arguments:
         return {"content": [{"type": "text", "text": "Error: 'status' argument is required when action is 'add'."}], "isError": True}

    # Construct payload
    payload = {
        "ids": arguments["ids"],
        "action": action,
        "target_list_ids": arguments["target_list_ids"],
    }
    if action == "add":
        payload["status"] = arguments["status"]

    return await make_request("PUT", "/subscribers/lists", data=payload)


# --- Router (Optional, could also be in main.py) ---
# A dictionary mapping tool names to their handler functions
SUBSCRIBER_TOOL_HANDLERS = {
    "list_subscribers": handle_list_subscribers,
    "get_subscriber": handle_get_subscriber,
    "create_subscriber": handle_create_subscriber,
    "update_subscriber": handle_update_subscriber,
    "delete_subscriber": handle_delete_subscriber,
    "blocklist_subscriber": handle_blocklist_subscriber,
    "manage_subscriber_lists": handle_manage_subscriber_lists,
}

async def route_subscriber_tool(tool_name: str, arguments: dict):
    """Routes a subscriber tool call to the appropriate handler."""
    handler = SUBSCRIBER_TOOL_HANDLERS.get(tool_name)
    if handler:
        # In a real server, validate arguments against the tool's inputSchema here
        return await handler(arguments)
    else:
        # Should not happen if called via main.py router
        error_message = f"Error: Unknown subscriber tool '{tool_name}'"
        print(error_message, file=sys.stderr)
        return {"content": [{"type": "text", "text": error_message}], "isError": True}

# --- Test Execution Block / CLI Handler ---
if __name__ == "__main__":
    import asyncio
    import argparse

    parser = argparse.ArgumentParser(description="Run Listmonk subscriber functions directly.")
    parser.add_argument("function", choices=["list", "get", "create", "update", "delete", "blocklist", "manage_lists"], help="The function to execute.")
    parser.add_argument("arguments_json", help="JSON string containing the arguments for the function.")

    cli_args = parser.parse_args()

    try:
        arguments = json.loads(cli_args.arguments_json)
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON provided for arguments: {e}", file=sys.stderr)
        sys.exit(1)

    async def run_specific_function():
        print(f"--- Running function '{cli_args.function}' with args: {arguments} ---")
        result = {}
        if cli_args.function == "list":
            result = await handle_list_subscribers(arguments)
        elif cli_args.function == "get":
            result = await handle_get_subscriber(arguments)
        elif cli_args.function == "create":
            result = await handle_create_subscriber(arguments)
        elif cli_args.function == "update":
            result = await handle_update_subscriber(arguments)
        elif cli_args.function == "delete":
            result = await handle_delete_subscriber(arguments)
        elif cli_args.function == "blocklist":
            result = await handle_blocklist_subscriber(arguments)
        elif cli_args.function == "manage_lists":
            result = await handle_manage_subscriber_lists(arguments)
        else:
            # Should not happen due to choices in argparse
            print(f"Error: Unknown function '{cli_args.function}'", file=sys.stderr)
            sys.exit(1)

        print(f"\n--- Result ---")
        print(json.dumps(result, indent=2))
        print("--- Execution Complete ---")

        # Exit with non-zero code if the result indicates an error
        if result.get("isError"):
            sys.exit(1)


    # Run the selected function
    asyncio.run(run_specific_function())


    # --- Original Test Code (kept for reference, but not executed via CLI) ---
    async def run_all_tests():
        print("\n(Original Test Suite) Testing handle_list_subscribers (Live API Call):")
        # Test with default params (page=1, per_page=100)
        result1 = await handle_list_subscribers({})
        print(f"Result (list_subscribers): {json.dumps(result1, indent=2)}")

        # Extract a valid ID from the first result if possible, otherwise use a placeholder
        subscriber_id_to_get = 1 # Default placeholder
        if not result1.get("isError") and result1["content"][0]["json"]["data"]["results"]:
             try:
                 subscriber_id_to_get = result1["content"][0]["json"]["data"]["results"][0]["id"]
                 print(f"\nWill attempt to get subscriber with ID: {subscriber_id_to_get}")
             except (KeyError, IndexError):
                 print("\nCould not extract subscriber ID from list result, using placeholder ID.")


        print(f"\nTesting handle_get_subscriber (Live API Call with ID: {subscriber_id_to_get}):")
        result2 = await handle_get_subscriber({"subscriber_id": subscriber_id_to_get})
        print(f"Result (get_subscriber): {json.dumps(result2, indent=2)}")

        print("\nTesting handle_get_subscriber (Live API Call with invalid ID type):")
        result_invalid_type = await handle_get_subscriber({"subscriber_id": "not-an-int"})
        print(f"Result (get_subscriber invalid type): {json.dumps(result_invalid_type, indent=2)}")

        print("\nTesting handle_get_subscriber (Live API Call with non-existent ID):")
        result_not_found = await handle_get_subscriber({"subscriber_id": 999999})
        print(f"Result (get_subscriber not found): {json.dumps(result_not_found, indent=2)}")

        print("\nTesting handle_create_subscriber (Live API Call):")
        # Use a unique email each time to avoid conflicts if run multiple times
        import time
        timestamp = int(time.time())
        test_email = f"test.subscriber.{timestamp}@example.com"
        create_args = {
            "email": test_email,
            "name": f"Test User {timestamp}",
            "status": "enabled",
            "lists": [3], # Assuming list ID 3 exists from previous tests
            "attribs": {"test_run": timestamp},
            "preconfirm_subscriptions": True
        }
        result_create = await handle_create_subscriber(create_args)
        print(f"Result (create_subscriber): {json.dumps(result_create, indent=2)}")

        created_subscriber_id = None
        if not result_create.get("isError"):
             try:
                 created_subscriber_id = result_create["content"][0]["json"]["data"]["id"]
                 print(f"\nSubscriber created with ID: {created_subscriber_id}")

                 # Test Update
                 print(f"\nTesting handle_update_subscriber (Live API Call for ID: {created_subscriber_id}):")
                 update_args = {
                     "subscriber_id": created_subscriber_id,
                     "name": f"Test User {timestamp} (Updated)",
                     "attribs": {"test_run": timestamp, "updated": True}
                 }
                 result_update = await handle_update_subscriber(update_args)
                 print(f"Result (update_subscriber): {json.dumps(result_update, indent=2)}")

                 # Test Delete
                 print(f"\nTesting handle_delete_subscriber (Live API Call for ID: {created_subscriber_id}):")
                 result_delete = await handle_delete_subscriber({"subscriber_id": created_subscriber_id})
                 print(f"Result (delete_subscriber): {json.dumps(result_delete, indent=2)}")

                 # Verify Deletion (optional)
                 print(f"\nVerifying deletion by trying to GET ID: {created_subscriber_id}")
                 result_get_deleted = await handle_get_subscriber({"subscriber_id": created_subscriber_id})
                 print(f"Result (get deleted subscriber): {json.dumps(result_get_deleted, indent=2)}")


             except (KeyError, IndexError, TypeError) as e:
                 print(f"\nCould not extract created subscriber ID or run update/delete tests: {e}")


        print("\nTesting route_subscriber_tool (known tool - list):")
        result3 = await route_subscriber_tool("list_subscribers", {"per_page": 2}) # Test with arg
        print(f"Result (route list): {json.dumps(result3, indent=2)}")

        print("\nTesting route_subscriber_tool (unknown tool):")
        result4 = await route_subscriber_tool("nonexistent_tool", {})
        print(f"Result (route unknown): {json.dumps(result4, indent=2)}")

    # To run the original full test suite (not via CLI):
    # asyncio.run(run_all_tests())
    # print("\n--- Original Test Suite Execution Complete ---")
