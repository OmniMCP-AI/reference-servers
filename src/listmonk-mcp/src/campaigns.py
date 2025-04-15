# src/campaigns.py
# Handlers for Listmonk campaign-related MCP tools

import requests
import json
import sys
from requests.auth import HTTPBasicAuth
import asyncio
# Import the centralized request function
from src.client import make_request
# Note: MCP types would be imported from the SDK if used

# --- Tool Definitions ---

get_campaign_schema = {
    "type": "object",
    "properties": {
        "campaign_id": {"type": "integer", "description": "The ID of the campaign to retrieve."},
        "no_body": {"type": "boolean", "description": "Optional: If true, returns response without body content.", "default": False}
    },
    "required": ["campaign_id"]
}

list_campaigns_schema = {
    "type": "object",
    "properties": {
        "query": {"type": "string", "description": "SQL query expression to filter campaigns."},
        "status": {"type": "array", "items": {"type": "string"}, "description": "Status to filter campaigns."},
        "tags": {"type": "array", "items": {"type": "string"}, "description": "Tags to filter campaigns."},
        "order_by": {"type": "string", "enum": ["name", "status", "created_at", "updated_at"], "description": "Field to sort results by."},
        "order": {"type": "string", "enum": ["ASC", "DESC"], "description": "Sort order."},
        "page": {"type": "integer", "description": "Page number for pagination.", "default": 1},
        "per_page": {"type": ["integer", "string"], "description": "Results per page. Use 'all' for all results.", "default": 100},
        "no_body": {"type": "boolean", "description": "Optional: If true, returns response without body content.", "default": False}
    },
    "required": []
}

create_campaign_schema = {
    "type": "object",
    "properties": {
        "name": {"type": "string", "description": "Campaign name."},
        "subject": {"type": "string", "description": "Campaign email subject."},
        "lists": {"type": "array", "items": {"type": "integer"}, "description": "List IDs to send campaign to."},
        "from_email": {"type": "string", "description": "Optional 'From' email. Defaults to settings value."},
        "type": {"type": "string", "enum": ["regular", "optin"], "description": "Campaign type."},
        "content_type": {"type": "string", "enum": ["richtext", "html", "markdown", "plain"], "description": "Content type."},
        "body": {"type": "string", "description": "Content body of campaign."},
        "altbody": {"type": "string", "description": "Optional plain text alt body for HTML/richtext."},
        "send_at": {"type": "string", "format": "date-time", "description": "Optional timestamp (YYYY-MM-DDTHH:MM:SSZ) to schedule."},
        "messenger": {"type": "string", "description": "Optional messenger ('email' or custom). Defaults to 'email'."},
        "template_id": {"type": "integer", "description": "Optional template ID. Defaults to default template."},
        "tags": {"type": "array", "items": {"type": "string"}, "description": "Optional tags."},
        "headers": {"type": "array", "items": {"type": "object"}, "description": "Optional array of key-value SMTP headers e.g., [{'X-Custom': 'value'}]."}
    },
    "required": ["name", "subject", "lists", "type", "content_type", "body"]
}

update_campaign_schema = {
    "type": "object",
    "properties": {
        "campaign_id": {"type": "integer", "description": "The ID of the campaign to update."},
        # Include all properties from create_campaign_schema except 'campaign_id' as optional
        "name": {"type": "string", "description": "Optional: New campaign name."},
        "subject": {"type": "string", "description": "Optional: New subject."},
        "lists": {"type": "array", "items": {"type": "integer"}, "description": "Optional: New list IDs."},
        "from_email": {"type": "string", "description": "Optional: New 'From' email."},
        "type": {"type": "string", "enum": ["regular", "optin"], "description": "Optional: New type."},
        "content_type": {"type": "string", "enum": ["richtext", "html", "markdown", "plain"], "description": "Optional: New content type."},
        "body": {"type": "string", "description": "Optional: New body."},
        "altbody": {"type": "string", "description": "Optional: New alt body."},
        "send_at": {"type": "string", "format": "date-time", "description": "Optional: New schedule time."},
        "messenger": {"type": "string", "description": "Optional: New messenger."},
        "template_id": {"type": "integer", "description": "Optional: New template ID."},
        "tags": {"type": "array", "items": {"type": "string"}, "description": "Optional: New tags (replaces existing)."},
        "headers": {"type": "array", "items": {"type": "object"}, "description": "Optional: New headers."}
    },
    "required": ["campaign_id"]
}

delete_campaign_schema = {
    "type": "object",
    "properties": {
        "campaign_id": {"type": "integer", "description": "The ID of the campaign to delete."}
    },
    "required": ["campaign_id"]
}

change_campaign_status_schema = {
    "type": "object",
    "properties": {
        "campaign_id": {"type": "integer", "description": "The ID of the campaign to change status for."},
        "status": {"type": "string", "enum": ["draft", "scheduled", "running", "paused", "cancelled"], "description": "The new status."}
    },
    "required": ["campaign_id", "status"]
}

CAMPAIGN_TOOLS = [
    {
        "name": "get_campaign",
        "description": "Retrieve a specific campaign by ID (includes basic stats).",
        "inputSchema": get_campaign_schema
    },
    {
        "name": "list_campaigns",
        "description": "List and query campaigns based on various filters.",
        "inputSchema": list_campaigns_schema
    },
    {
        "name": "create_campaign",
        "description": "Create a new campaign.",
        "inputSchema": create_campaign_schema
    },
    {
        "name": "update_campaign",
        "description": "Update an existing campaign.",
        "inputSchema": update_campaign_schema
    },
    {
        "name": "delete_campaign",
        "description": "Delete a campaign.",
        "inputSchema": delete_campaign_schema
    },
    {
        "name": "change_campaign_status",
        "description": "Change the status of a campaign (e.g., schedule, pause, cancel).",
        "inputSchema": change_campaign_status_schema
    },
    # Note: get_campaign_stats is covered by get_campaign for basic stats.
]

# --- Tool Handler Functions ---

async def handle_get_campaign(arguments: dict):
    """Handles the 'get_campaign' MCP tool call."""
    print(f"Handling get_campaign with args: {arguments}")
    campaign_id = arguments.get("campaign_id")
    if not isinstance(campaign_id, int):
        return {"content": [{"type": "text", "text": "Error: Missing or invalid 'campaign_id'."}], "isError": True}
    params = {"no_body": arguments.get("no_body", False)}
    return await make_request("GET", f"/campaigns/{campaign_id}", params=params)

async def handle_list_campaigns(arguments: dict):
    """Handles the 'list_campaigns' MCP tool call."""
    print(f"Handling list_campaigns with args: {arguments}")
    params = {}
    if "query" in arguments: params["query"] = arguments["query"]
    if "status" in arguments: params["status"] = arguments["status"]
    if "tags" in arguments: params["tags"] = arguments["tags"]
    if "order_by" in arguments: params["order_by"] = arguments["order_by"]
    if "order" in arguments: params["order"] = arguments["order"]
    params["page"] = arguments.get("page", 1)
    params["per_page"] = arguments.get("per_page", 100)
    if arguments.get("no_body"): params["no_body"] = True
    return await make_request("GET", "/campaigns", params=params)

async def handle_create_campaign(arguments: dict):
    """Handles the 'create_campaign' MCP tool call."""
    print(f"Handling create_campaign with args: {arguments}")
    required_args = ["name", "subject", "lists", "type", "content_type", "body"]
    if not all(arg in arguments for arg in required_args):
        return {"content": [{"type": "text", "text": f"Error: Missing required arguments: {required_args}"}], "isError": True}
    payload = arguments.copy() # Avoid modifying original args
    return await make_request("POST", "/campaigns", data=payload)

async def handle_update_campaign(arguments: dict):
    """Handles the 'update_campaign' MCP tool call."""
    print(f"Handling update_campaign with args: {arguments}")
    campaign_id = arguments.get("campaign_id")
    if not isinstance(campaign_id, int):
        return {"content": [{"type": "text", "text": "Error: Missing or invalid 'campaign_id'."}], "isError": True}
    payload = arguments.copy()
    del payload["campaign_id"] # Don't send campaign_id in payload
    if not payload:
         return {"content": [{"type": "text", "text": "Error: At least one field must be provided for update."}], "isError": True}

    # Fetch current campaign data to get existing lists if not provided in update
    if "lists" not in payload:
        print(f"Fetching current data for campaign {campaign_id} to preserve lists...")
        current_data_response = await handle_get_campaign({"campaign_id": campaign_id})
        if current_data_response.get("isError"):
            print(f"Error fetching current campaign data: {current_data_response['content'][0]['text']}", file=sys.stderr)
            # Don't proceed with update if fetch failed
            return {"content": [{"type": "text", "text": "Failed to fetch current campaign data; update aborted to prevent list removal."}], "isError": True}
        try:
            current_data = current_data_response["content"][0]["json"]["data"]
            current_list_ids = [lst["id"] for lst in current_data.get("lists", [])]
            if current_list_ids:
                 payload["lists"] = current_list_ids
            else:
                 # This case might indicate an issue or an empty list association
                 print(f"Warning: Campaign {campaign_id} has no associated lists currently.", file=sys.stderr)
                 # If API requires lists, this update might still fail. Let's proceed cautiously.
                 # Alternatively, could return an error here if lists are mandatory for PUT.
                 # For now, we'll send the update without the lists field if it was empty.

        except (KeyError, IndexError, TypeError) as e:
            error_message = f"Error parsing current campaign data: {e}"
            print(error_message, file=sys.stderr)
            return {"content": [{"type": "text", "text": error_message}], "isError": True}

    # Ensure required fields for PUT are present (even if not changing, API might need them)
    # Based on error, 'lists' seems mandatory. Let's ensure it's always included if possible.
    if "lists" not in payload:
         # If we couldn't fetch lists and they weren't provided, we have to error out
         return {"content": [{"type": "text", "text": "Error: 'lists' field is required for campaign update but could not be determined."}], "isError": True}

    return await make_request("PUT", f"/campaigns/{campaign_id}", data=payload)

async def handle_delete_campaign(arguments: dict):
    """Handles the 'delete_campaign' MCP tool call."""
    print(f"Handling delete_campaign with args: {arguments}")
    campaign_id = arguments.get("campaign_id")
    if not isinstance(campaign_id, int):
        return {"content": [{"type": "text", "text": "Error: Missing or invalid 'campaign_id'."}], "isError": True}
    return await make_request("DELETE", f"/campaigns/{campaign_id}")

async def handle_change_campaign_status(arguments: dict):
    """Handles the 'change_campaign_status' MCP tool call."""
    print(f"Handling change_campaign_status with args: {arguments}")
    campaign_id = arguments.get("campaign_id")
    status = arguments.get("status")
    if not isinstance(campaign_id, int) or not status:
        return {"content": [{"type": "text", "text": "Error: Missing or invalid 'campaign_id' or 'status'."}], "isError": True}
    payload = {"status": status}
    return await make_request("PUT", f"/campaigns/{campaign_id}/status", data=payload)

# --- Router ---
CAMPAIGN_TOOL_HANDLERS = {
    "get_campaign": handle_get_campaign,
    "list_campaigns": handle_list_campaigns,
    "create_campaign": handle_create_campaign,
    "update_campaign": handle_update_campaign,
    "delete_campaign": handle_delete_campaign,
    "change_campaign_status": handle_change_campaign_status,
}

async def route_campaign_tool(tool_name: str, arguments: dict):
    """Routes a campaign tool call to the appropriate handler."""
    handler = CAMPAIGN_TOOL_HANDLERS.get(tool_name)
    if handler:
        return await handler(arguments)
    else:
        error_message = f"Error: Unknown campaign tool '{tool_name}'"
        print(error_message, file=sys.stderr)
        return {"content": [{"type": "text", "text": error_message}], "isError": True}

# --- Test Execution Block / CLI Handler ---
if __name__ == "__main__":
    import asyncio
    import argparse

    parser = argparse.ArgumentParser(description="Run Listmonk campaign functions directly.")
    parser.add_argument("function", choices=list(CAMPAIGN_TOOL_HANDLERS.keys()), help="The campaign function to execute.")
    parser.add_argument("arguments_json", help="JSON string containing the arguments for the function.")

    cli_args = parser.parse_args()

    try:
        arguments = json.loads(cli_args.arguments_json)
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON provided for arguments: {e}", file=sys.stderr)
        sys.exit(1)

    async def run_specific_function():
        print(f"--- Running campaign function '{cli_args.function}' with args: {arguments} ---")
        result = await route_campaign_tool(cli_args.function, arguments)
        print(f"\n--- Result ---")
        print(json.dumps(result, indent=2))
        print("--- Execution Complete ---")
        if result.get("isError"):
            sys.exit(1)

    asyncio.run(run_specific_function())
