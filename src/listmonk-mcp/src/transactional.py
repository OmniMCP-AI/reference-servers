# src/transactional.py
# Handlers for Listmonk transactional message MCP tools

import requests
import json
import sys
from requests.auth import HTTPBasicAuth
import asyncio
# Import the centralized request function
from src.client import make_request
# Note: MCP types would be imported from the SDK if used

# --- Tool Definitions ---

send_transactional_message_schema = {
    "type": "object",
    "properties": {
        "template_id": {"type": "integer", "description": "ID of the transactional template to use."},
        "subscriber_email": {"type": "string", "description": "Email of the recipient subscriber."},
        "subscriber_id": {"type": "integer", "description": "ID of the recipient subscriber."},
        "subscriber_emails": {"type": "array", "items": {"type": "string"}, "description": "List of recipient emails."},
        "subscriber_ids": {"type": "array", "items": {"type": "integer"}, "description": "List of recipient IDs."},
        "from_email": {"type": "string", "description": "Optional sender email address."},
        "data": {"type": "object", "description": "Optional JSON object with data for the template."},
        "headers": {"type": "array", "items": {"type": "object"}, "description": "Optional array of custom email headers."},
        "messenger": {"type": "string", "description": "Optional messenger name (default 'email')."},
        "content_type": {"type": "string", "enum": ["html", "markdown", "plain"], "description": "Optional content type."}
    },
    "required": ["template_id"],
    # Need at least one subscriber identifier
    "anyOf": [
        {"required": ["subscriber_email"]},
        {"required": ["subscriber_id"]},
        {"required": ["subscriber_emails"]},
        {"required": ["subscriber_ids"]}
    ]
}

TRANSACTIONAL_TOOLS = [
    {
        "name": "send_transactional_message",
        "description": "Send a transactional message using a pre-defined template.",
        "inputSchema": send_transactional_message_schema
    }
]

# --- Tool Handler Functions ---

async def handle_send_transactional_message(arguments: dict):
    """Handles the 'send_transactional_message' MCP tool call."""
    print(f"Handling send_transactional_message with args: {arguments}")

    # Validate required fields
    if "template_id" not in arguments:
        return {"content": [{"type": "text", "text": "Error: Missing required argument 'template_id'."}], "isError": True}
    if not any(key in arguments for key in ["subscriber_email", "subscriber_id", "subscriber_emails", "subscriber_ids"]):
        return {"content": [{"type": "text", "text": "Error: At least one subscriber identifier (email, id, emails, ids) is required."}], "isError": True}

    # Construct payload - API expects exactly these fields
    payload = {
        "template_id": arguments["template_id"]
    }
    # Add subscriber identifiers (preferring plural if both singular/plural exist)
    if "subscriber_emails" in arguments: payload["subscriber_emails"] = arguments["subscriber_emails"]
    elif "subscriber_email" in arguments: payload["subscriber_email"] = arguments["subscriber_email"]
    if "subscriber_ids" in arguments: payload["subscriber_ids"] = arguments["subscriber_ids"]
    elif "subscriber_id" in arguments: payload["subscriber_id"] = arguments["subscriber_id"]

    # Add optional fields
    if "from_email" in arguments: payload["from_email"] = arguments["from_email"]
    if "data" in arguments: payload["data"] = arguments["data"]
    if "headers" in arguments: payload["headers"] = arguments["headers"]
    if "messenger" in arguments: payload["messenger"] = arguments["messenger"]
    if "content_type" in arguments: payload["content_type"] = arguments["content_type"]

    # Note: File attachments require multipart/form-data, not handled here.
    return await make_request("POST", "/tx", data=payload)


# --- Router ---
TRANSACTIONAL_TOOL_HANDLERS = {
    "send_transactional_message": handle_send_transactional_message,
}

async def route_transactional_tool(tool_name: str, arguments: dict):
    """Routes a transactional tool call to the appropriate handler."""
    handler = TRANSACTIONAL_TOOL_HANDLERS.get(tool_name)
    if handler:
        return await handler(arguments)
    else:
        error_message = f"Error: Unknown transactional tool '{tool_name}'"
        print(error_message, file=sys.stderr)
        return {"content": [{"type": "text", "text": error_message}], "isError": True}

# --- Test Execution Block / CLI Handler ---
if __name__ == "__main__":
    import asyncio
    import argparse

    parser = argparse.ArgumentParser(description="Run Listmonk transactional functions directly.")
    parser.add_argument("function", choices=list(TRANSACTIONAL_TOOL_HANDLERS.keys()), help="The transactional function to execute.")
    parser.add_argument("arguments_json", help="JSON string containing the arguments for the function.")

    cli_args = parser.parse_args()

    try:
        arguments = json.loads(cli_args.arguments_json)
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON provided for arguments: {e}", file=sys.stderr)
        sys.exit(1)

    async def run_specific_function():
        print(f"--- Running transactional function '{cli_args.function}' with args: {arguments} ---")
        result = await route_transactional_tool(cli_args.function, arguments)
        print(f"\n--- Result ---")
        print(json.dumps(result, indent=2))
        print("--- Execution Complete ---")
        if result.get("isError"):
            sys.exit(1)

    asyncio.run(run_specific_function())
