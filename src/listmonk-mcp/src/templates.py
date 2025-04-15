# src/templates.py
# Handlers for Listmonk template-related MCP tools

import requests
import json
import sys
from requests.auth import HTTPBasicAuth
import asyncio
# Import the centralized request function
from src.client import make_request
# Note: MCP types would be imported from the SDK if used

# --- Tool Definitions ---

list_templates_schema = {
    "type": "object",
    "properties": {}, # No parameters listed in API.md
    "required": []
}

get_template_schema = {
    "type": "object",
    "properties": {
        "template_id": {"type": "integer", "description": "The ID of the template to retrieve."}
    },
    "required": ["template_id"]
}

preview_template_schema = {
    "type": "object",
    "properties": {
        "template_id": {"type": "integer", "description": "The ID of the template to preview."}
    },
    "required": ["template_id"]
}

create_template_schema = {
    "type": "object",
    "properties": {
        "name": {"type": "string", "description": "Name of the template."},
        "type": {"type": "string", "enum": ["campaign", "tx"], "description": "Type of template ('campaign' or 'tx')."},
        "body": {"type": "string", "description": "HTML body of the template."},
        "subject": {"type": "string", "description": "Optional subject line (only for 'tx' type)."}
    },
    "required": ["name", "type", "body"]
}

update_template_schema = {
    "type": "object",
    "properties": {
        "template_id": {"type": "integer", "description": "The ID of the template to update."},
        "name": {"type": "string", "description": "Optional: New name."},
        "type": {"type": "string", "enum": ["campaign", "tx"], "description": "Optional: New type."},
        "body": {"type": "string", "description": "Optional: New body."},
        "subject": {"type": "string", "description": "Optional: New subject (only for 'tx' type)."}
    },
    "required": ["template_id"]
}

set_default_template_schema = {
    "type": "object",
    "properties": {
        "template_id": {"type": "integer", "description": "The ID of the template to set as default."}
    },
    "required": ["template_id"]
}

delete_template_schema = {
    "type": "object",
    "properties": {
        "template_id": {"type": "integer", "description": "The ID of the template to delete."}
    },
    "required": ["template_id"]
}

render_template_preview_schema = {
    "type": "object",
    "properties": {
        "body": {"type": "string", "description": "HTML body of the template to render."},
        "type": {"type": "string", "enum": ["campaign", "tx"], "description": "Type of template ('campaign' or 'tx')."},
        "subject": {"type": "string", "description": "Optional subject line (only for 'tx' type)."}
    },
    "required": ["body", "type"]
}


TEMPLATE_TOOLS = [
    {"name": "list_templates", "description": "Retrieve all templates.", "inputSchema": list_templates_schema},
    {"name": "get_template", "description": "Retrieve a specific template by ID.", "inputSchema": get_template_schema},
    {"name": "preview_template", "description": "Retrieve the HTML preview of a saved template.", "inputSchema": preview_template_schema},
    {"name": "create_template", "description": "Create a new template.", "inputSchema": create_template_schema},
    {"name": "update_template", "description": "Update an existing template.", "inputSchema": update_template_schema},
    {"name": "set_default_template", "description": "Set a template as the default for its type.", "inputSchema": set_default_template_schema},
    {"name": "delete_template", "description": "Delete a template.", "inputSchema": delete_template_schema},
    {"name": "render_template_preview", "description": "Render and preview an arbitrary template body.", "inputSchema": render_template_preview_schema},
]

# --- Tool Handler Functions ---

async def handle_list_templates(arguments: dict):
    """Handles the 'list_templates' MCP tool call."""
    print(f"Handling list_templates with args: {arguments}")
    return await make_request("GET", "/templates")

async def handle_get_template(arguments: dict):
    """Handles the 'get_template' MCP tool call."""
    print(f"Handling get_template with args: {arguments}")
    template_id = arguments.get("template_id")
    if not isinstance(template_id, int):
        return {"content": [{"type": "text", "text": "Error: Missing or invalid 'template_id'."}], "isError": True}
    return await make_request("GET", f"/templates/{template_id}")

async def handle_preview_template(arguments: dict):
    """Handles the 'preview_template' MCP tool call."""
    print(f"Handling preview_template with args: {arguments}")
    template_id = arguments.get("template_id")
    if not isinstance(template_id, int):
        return {"content": [{"type": "text", "text": "Error: Missing or invalid 'template_id'."}], "isError": True}
    # Expect HTML response
    return await make_request("GET", f"/templates/{template_id}/preview", expect_html=True)

async def handle_create_template(arguments: dict):
    """Handles the 'create_template' MCP tool call."""
    print(f"Handling create_template with args: {arguments}")
    required_args = ["name", "type", "body"]
    if not all(arg in arguments for arg in required_args):
        return {"content": [{"type": "text", "text": f"Error: Missing required arguments: {required_args}"}], "isError": True}
    payload = arguments.copy()
    return await make_request("POST", "/templates", data=payload)

async def handle_update_template(arguments: dict):
    """Handles the 'update_template' MCP tool call."""
    print(f"Handling update_template with args: {arguments}")
    template_id = arguments.get("template_id")
    if not isinstance(template_id, int):
        return {"content": [{"type": "text", "text": "Error: Missing or invalid 'template_id'."}], "isError": True}
    payload = arguments.copy()
    del payload["template_id"]
    if not payload:
         return {"content": [{"type": "text", "text": "Error: At least one field (name, type, body, subject) must be provided for update."}], "isError": True}
    return await make_request("PUT", f"/templates/{template_id}", data=payload)

async def handle_set_default_template(arguments: dict):
    """Handles the 'set_default_template' MCP tool call."""
    print(f"Handling set_default_template with args: {arguments}")
    template_id = arguments.get("template_id")
    if not isinstance(template_id, int):
        return {"content": [{"type": "text", "text": "Error: Missing or invalid 'template_id'."}], "isError": True}
    # This PUT request doesn't need a body
    return await make_request("PUT", f"/templates/{template_id}/default")

async def handle_delete_template(arguments: dict):
    """Handles the 'delete_template' MCP tool call."""
    print(f"Handling delete_template with args: {arguments}")
    template_id = arguments.get("template_id")
    if not isinstance(template_id, int):
        return {"content": [{"type": "text", "text": "Error: Missing or invalid 'template_id'."}], "isError": True}
    return await make_request("DELETE", f"/templates/{template_id}")

async def handle_render_template_preview(arguments: dict):
    """Handles the 'render_template_preview' MCP tool call."""
    print(f"Handling render_template_preview with args: {arguments}")
    required_args = ["body", "type"]
    if not all(arg in arguments for arg in required_args):
        return {"content": [{"type": "text", "text": f"Error: Missing required arguments: {required_args}"}], "isError": True}
    payload = arguments.copy()
    # Expect HTML response
    return await make_request("POST", "/templates/preview", data=payload, expect_html=True)


# --- Router ---
TEMPLATE_TOOL_HANDLERS = {
    "list_templates": handle_list_templates,
    "get_template": handle_get_template,
    "preview_template": handle_preview_template,
    "create_template": handle_create_template,
    "update_template": handle_update_template,
    "set_default_template": handle_set_default_template,
    "delete_template": handle_delete_template,
    "render_template_preview": handle_render_template_preview,
}

async def route_template_tool(tool_name: str, arguments: dict):
    """Routes a template tool call to the appropriate handler."""
    handler = TEMPLATE_TOOL_HANDLERS.get(tool_name)
    if handler:
        return await handler(arguments)
    else:
        error_message = f"Error: Unknown template tool '{tool_name}'"
        print(error_message, file=sys.stderr)
        return {"content": [{"type": "text", "text": error_message}], "isError": True}

# --- Test Execution Block / CLI Handler ---
if __name__ == "__main__":
    import asyncio
    import argparse

    parser = argparse.ArgumentParser(description="Run Listmonk template functions directly.")
    parser.add_argument("function", choices=list(TEMPLATE_TOOL_HANDLERS.keys()), help="The template function to execute.")
    parser.add_argument("arguments_json", help="JSON string containing the arguments for the function.")

    cli_args = parser.parse_args()

    try:
        arguments = json.loads(cli_args.arguments_json)
    except json.JSONDecodeError as e:
        print(f"Error: Invalid JSON provided for arguments: {e}", file=sys.stderr)
        sys.exit(1)

    async def run_specific_function():
        print(f"--- Running template function '{cli_args.function}' with args: {arguments} ---")
        result = await route_template_tool(cli_args.function, arguments)
        print(f"\n--- Result ---")
        # Don't double-indent JSON if it's already JSON
        if result.get("content") and result["content"][0].get("type") == "json":
             print(json.dumps(result, indent=2))
        elif result.get("content") and result["content"][0].get("type") == "text":
             # Print text directly for HTML previews etc.
             print(f"Text Content:\n{result['content'][0]['text']}")
             if result.get("isError"): print("(Result indicates error)")
        else:
             # Fallback pretty print
             print(json.dumps(result, indent=2))

        print("--- Execution Complete ---")
        if result.get("isError"):
            sys.exit(1)

    asyncio.run(run_specific_function())
