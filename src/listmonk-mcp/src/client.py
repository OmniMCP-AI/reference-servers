# src/client.py
# Centralized Listmonk API client logic

import requests
import json
import sys
from requests.auth import HTTPBasicAuth
import asyncio

# Import configuration loaded in main.py
# This creates a dependency, but avoids passing config everywhere
# Ensure main.py loads config before this module is heavily used.
try:
    from src.main import LISTMONK_ENDPOINT, API_USER, API_TOKEN
except ImportError:
    # Fallback for direct script execution or potential import issues.
    print("Warning: Could not import config from src.main. Using client.py defaults.", file=sys.stderr)
    LISTMONK_ENDPOINT = "https://mail.ngomis.com/api" # Fallback
    API_USER = "ngomis_admin" # Fallback
    API_TOKEN = "ZJstTwLA9P6N7W2jHlhGMeIKSnccYXth" # Fallback


def make_request_sync(method: str, endpoint: str, params: dict = None, data: dict = None, expect_html: bool = False):
    """Synchronous helper function to make requests and handle common errors."""
    url = f"{LISTMONK_ENDPOINT}{endpoint}"
    auth = HTTPBasicAuth(API_USER, API_TOKEN)
    headers = {'Content-Type': 'application/json'} if data and not expect_html else {} # expect_html implies GET usually

    print(f"Calling {method} {url}")
    if params: print(f"  Params: {params}")
    if data: print(f"  Data: {json.dumps(data)}")

    try:
        response = requests.request(method, url, auth=auth, params=params, headers=headers, json=data, timeout=20)
        response.raise_for_status()

        if expect_html:
            return {"content": [{"type": "text", "text": response.text}]}

        if response.status_code == 204 or not response.content:
             if method == "DELETE": return {"content": [{"type": "json", "json": {"data": True}}]}
             if method == "POST" and endpoint == "/tx": return {"content": [{"type": "json", "json": {"data": True}}]}
             # Add other specific cases if needed (like PUT /default)
             return {"content": [{"type": "text", "text": "Success (No Content)"}]}

        return {"content": [{"type": "json", "json": response.json()}]}
    except requests.exceptions.HTTPError as e:
        error_message = f"API HTTP Error ({e.response.status_code}): {e}"
        try:
            error_details = e.response.json()
            error_message += f" - {error_details.get('message', e.response.text)}"
        except json.JSONDecodeError:
            error_message += f" - {e.response.text}"
        print(error_message, file=sys.stderr)
        return {"content": [{"type": "text", "text": error_message}], "isError": True}
    except requests.exceptions.RequestException as e:
        error_message = f"API Request Error: {e}"
        print(error_message, file=sys.stderr)
        return {"content": [{"type": "text", "text": error_message}], "isError": True}
    except Exception as e:
        error_message = f"An unexpected error occurred: {e}"
        print(error_message, file=sys.stderr)
        return {"content": [{"type": "text", "text": error_message}], "isError": True}

async def make_request(method: str, endpoint: str, params: dict = None, data: dict = None, expect_html: bool = False):
    """Asynchronous wrapper for the request function."""
    return await asyncio.to_thread(make_request_sync, method, endpoint, params=params, data=data, expect_html=expect_html)
