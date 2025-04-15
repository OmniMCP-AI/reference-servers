# Listmonk MCP Server

<p align="center">
  <img src="https://listmonk.app/static/images/logo.svg" alt="Listmonk Logo" width="150"/>
</p>

## Overview

This project provides a Model Context Protocol (MCP) server designed to interact with a [Listmonk](https://listmonk.app/) instance. It allows users of Cline (or other MCP-compatible clients) to manage their Listmonk mailing lists, subscribers, campaigns, and more directly through the MCP interface.

This server acts as a bridge, translating MCP requests into Listmonk API calls.

## Benefits

*   **Integrate Listmonk with Cline:** Seamlessly manage Listmonk resources and actions within your Cline workflow.
*   **Automate Email Marketing Tasks:** Script and automate common Listmonk operations like adding subscribers, managing lists, or checking campaign stats.
*   **Centralized Management:** Interact with Listmonk alongside other tools and services connected via MCP.

## Features

This server exposes MCP tools corresponding to various Listmonk API endpoints:

*   **Subscribers:**
    *   `get_subscriber(subscriber_id)`
    *   `list_subscribers(query, list_id, status, page, per_page)`
    *   `create_subscriber(email, name, status, lists, attribs, preconfirm)`
    *   `update_subscriber(subscriber_id, email, name, status, lists, attribs)`
    *   `delete_subscriber(subscriber_id)`
    *   `blocklist_subscriber(subscriber_id)`
    *   `manage_subscriber_lists(subscriber_ids, action, list_ids, status)`
*   **Lists:**
    *   `get_list(list_id)`
    *   `list_lists(query, status, tag, page, per_page)`
    *   `create_list(name, type, optin, tags, description)`
    *   `update_list(list_id, name, type, optin, tags, description)`
    *   `delete_list(list_id)`

*   **Campaigns:**
    *   `get_campaign(campaign_id, no_body=False)`: Retrieves campaign details (includes basic stats like views, clicks, sent count).
    *   `list_campaigns(query=None, status=None, tags=None, page=1, per_page=100, no_body=False)`
    *   `create_campaign(name, subject, lists, type, content_type, body, from_email=None, altbody=None, send_at=None, messenger=None, template_id=None, tags=None, headers=None)`
    *   `update_campaign(campaign_id, name=None, subject=None, lists=None, ...)`: Updates specified fields of a campaign.
    *   `delete_campaign(campaign_id)`
    *   `change_campaign_status(campaign_id, status)`

*   **Templates:**
    *   `list_templates()`
    *   `get_template(template_id)`
    *   `preview_template(template_id)`
    *   `create_template(name, type, body, subject=None)`
    *   `update_template(template_id, name=None, type=None, body=None, subject=None)`
    *   `set_default_template(template_id)`
    *   `delete_template(template_id)`
    *   `render_template_preview(body, type, subject=None)`
    
*   **Bounces:**
    *   `list_bounces(campaign_id=None, page=None, per_page=None, source=None, order_by=None, order=None)`
    *   `delete_bounces(ids=None, all=None)`
    *   `delete_bounce(bounce_id)`
*   **Transactional:**
    *   `send_transactional_message(template_id, subscriber_email=None, subscriber_id=None, subscriber_emails=None, subscriber_ids=None, from_email=None, data=None, headers=None, messenger=None, content_type=None)`: Sends a message using a transactional template.

## Setup & Configuration

1.  **Prerequisites:**
    *   A running Listmonk instance.
    *   Python 3.x installed.
2.  **Installation:**
    *   Clone this repository (or obtain the packaged server).
    *   Navigate to the server directory.
    *   Set up a Python virtual environment:
        ```bash
        python3 -m venv venv
        source venv/bin/activate  # Linux/macOS
        # or .\venv\Scripts\activate # Windows
        ```
    *   Install dependencies:
        ```bash
        pip install -r requirements.txt
        ```
3.  **Environment Variables:**
    Create a `.env` file in the project root directory (or set environment variables directly). Copy the contents of `.env.example` and fill in your Listmonk API details:
    ```dotenv
    # .env
    LISTMONK_API_ENDPOINT="https://your-listmonk-instance.com/api"
    LISTMONK_API_USER="your_api_username"
    LISTMONK_API_TOKEN="your_api_password_or_token"
    ```
    The server uses the `python-dotenv` library to load these variables.
4.  **Configuration (MCP Settings):**
    When adding this server to your MCP client's configuration (e.g., `cline_mcp_settings.json`), you typically only need to specify the command to run the server. The server will pick up the credentials from the `.env` file or the system environment.
    *   `LISTMONK_API_ENDPOINT`: The full URL to your Listmonk API (e.g., `https://your-listmonk.com/api`).
    *   `LISTMONK_API_USER`: The username for API access created in Listmonk (Admin -> Users -> API).
    *   `LISTMONK_API_TOKEN`: The corresponding API access token for the user.

    **Example `cline_mcp_settings.json` entry:**
    ```json
    {
      "mcpServers": {
        "listmonk": {
          "command": "python",
          "args": ["/path/to/listmonk-mcp/src/main.py"],
          "env": {
            "LISTMONK_API_ENDPOINT": "YOUR_LISTMONK_API_URL",
            "LISTMONK_API_USER": "YOUR_API_USERNAME",
            "LISTMONK_API_TOKEN": "YOUR_API_TOKEN"
          },
          "disabled": false,
          "autoApprove": []
        }
      }
    }
    ```
    *(Note: The `command` and `args` might differ depending on packaging.)*

## Usage / Tutorial (Example MCP Tool Calls)

Once the server is implemented and configured, you could use tools like this (syntax may vary based on the MCP client):

**List Subscribers:**
```json
{
  "tool_name": "list_subscribers",
  "arguments": {
    "per_page": 10
  }
}
```

**Create a Subscriber:**
```json
{
  "tool_name": "create_subscriber",
  "arguments": {
    "email": "new.subscriber@example.com",
    "name": "New Subscriber",
    "status": "enabled",
    "lists": [3, 4],
    "preconfirm": true
  }
}
```

**Get Campaign Details:**
```json
{
  "tool_name": "get_campaign",
  "arguments": {
    "campaign_id": 5
  }
}
```

## Development

This server is built using Python. Key dependencies include:

*   `requests`: For making HTTP calls to the Listmonk API.
*   `python-dotenv`: For loading environment variables from a `.env` file.

The code structure organizes tool handlers by resource type:

*   `src/main.py`: Main server entry point, loads configuration, and handles MCP request routing.
*   `src/client.py`: Centralized helper for making authenticated API requests.
*   `src/subscribers.py`: Logic for subscriber-related tools.
*   `src/lists.py`: Logic for list-related tools.
*   `src/campaigns.py`: Logic for campaign-related tools.
*   `src/templates.py`: Logic for template-related tools.
*   `src/bounces.py`: Logic for bounce-related tools.
*   `src/transactional.py`: Logic for transactional message tools.
