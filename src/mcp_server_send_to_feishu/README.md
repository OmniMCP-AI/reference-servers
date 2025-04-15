# MCP Send to Feishu Server

[English](README.md) | [中文](README.zh.md)

A MCP server that sends notifications to Feishu and WebSocket when agent tasks are completed.

## Features

- Send notifications to Feishu webhook when tasks are completed
- Send notifications to WebSocket server
- Log all notifications to a local file
- Based on standard MCP protocol, integrates with various LLM clients

## Installation

### Install using [uv](https://docs.astral.sh/uv/) package manager

```bash
git clone https://github.com/byom/mcp_server_send_to_feishu.git
cd mcp_server_send_to_feishu

uv venv
source .venv/Scripts/activate

uv pip install mcp-server-send-to-feishu
# or
pip install mcp-server-send-to-feishu
```

After installation, call the module directly to check if installation was successful:
```bash
python -m mcp_server_send_to_feishu
```
This module accepts `--debug` or `--file` option, we can use it like:
```shell
python -m mcp_server_send_to_feishu --debug
python -m mcp_server_send_to_feishu --debug --log-file=path/to/logfile.log
```

## Configuration

### Feishu Webhook
The server is pre-configured with a Feishu webhook URL:
```
https://www.feishu.cn/***
```

### WebSocket Server
By default, the server connects to:
```
ws://localhost:8765
```

## Usage

### Using with Claude Desktop:

Find the configuration file `claude_desktop_config.json`
```json
{
    "mcpServers": {
        "NotificationServer": {
            "command": "uv",
            "args": [
              "--directory",
              "path/to/your/mcp_server_send_to_feishu project",
              "run",
              "mcp-server-send-to-feishu",
            ]
        }
    }
}
```

If installed globally, you can also use the python command:
```json
{
    "mcpServers": {
        "NotificationServer": {
            "command": "python",
            "args": [
              "-m",
              "mcp_server_send_to_feishu",
            ]
        }
    }
}
```

### Using with Cursor:
Find the configuration file `~/.cursor/mcp.json` or `your_project/.cursor/mcp.json`
```json
{
    "mcpServers": {
        "NotificationServer": {
            "command": "uv",
            "args": [
              "--directory",
              "path/to/your/mcp_server_send_to_feishu project",
              "run",
              "mcp-server-send-to-feishu",
            ]
        }
    }
}
```

After configuration, simply add a prompt like `finally, send me a notification when task finished.` at the end of your task input to the AI to trigger notifications.

In Cursor, you can add this prompt as a rule in `Cursor Settings` -> `Rules` so you don't have to type it manually each time.

## Notification Format

### Feishu Webhook
```json
{
    "msg_type": "text",
    "content": {
        "text": "title\nmessage"
    }
}
```

### WebSocket
```json
{
    "type": "notification",
    "title": "title",
    "message": "message"
}
```

### Local Log File
Notifications are logged to `notifications.log` in JSON format:
```json
{
    "title": "title",
    "message": "message",
    "timestamp": "2024-04-14 12:34:56.789012"
}
```

## License

MIT

## Contributions

Issues and pull requests are welcome!
