# MCP Send to Feishu Server

[English](README.md) | [中文](README.zh.md)

一个为 LLM 提供飞书和 WebSocket 通知功能的 Model Context Protocol (MCP) 服务。当完成 agent 任务时，可以通过这个服务发送通知到飞书和 WebSocket 服务器。

## 功能特点

- 在 Agent 任务完成后发送通知到飞书 webhook
- 发送通知到 WebSocket 服务器
- 将所有通知记录到本地文件
- 基于标准 MCP 协议，可与多种 LLM 客户端集成

## 安装

### 使用 [uv](https://docs.astral.sh/uv/) 包管理器安装

```bash
git clone https://github.com/Cactusinhand/mcp_server_send_to_feishu.git
cd mcp_server_send_to_feishu

uv venv
source .venv/Scripts/activate

uv pip install mcp-server-send-to-feishu
# or
pip install mcp-server-send-to-feishu
```

安装完成后，直接调用模块，查看是否安装成功：
```bash
python -m mcp_server_send_to_feishu
```
该模块接受 `--debug`, `--log-file` 选项，在调试时可以打开，如：
```shell
python -m mcp_server_send_to_feishu --debug
python -m mcp_server_send_to_feishu --debug --log-file=path/to/logfile.log
```

## 配置

### 飞书 Webhook
服务器已预配置飞书 webhook URL：
```
https://www.feishu.cn/***
```

### WebSocket 服务器
默认连接到：
```
ws://localhost:8765
```

## 使用方法

### 在 Claude Desktop 上使用：

找到配置文件 `claude_desktop_config.json`
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

如果是安装到了全局，还可以使用 python 命令调用：
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

### 在 Cursor 上使用：
找到配置文件 `~/.cursor/mcp.json` 或者： `your_project/.cursor/mcp.json`
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

配置完成后，只需要在给 AI 输入任务的最后，加上一句类似于这样的提示词：`finally, send me a notification when task finished.` 就可以触发了。

在 Cursor 中可以在 `Cursor Settings` -> `Rules` 里面添加这条提示词作为规则，则不用每次手动输入了。

## 通知格式

### 飞书 Webhook
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

### 本地日志文件
通知会被记录到 `notifications.log` 文件中，格式如下：
```json
{
    "title": "title",
    "message": "message",
    "timestamp": "2024-04-14 12:34:56.789012"
}
```

## 许可证

MIT

## 贡献

欢迎提交问题和拉取请求！ 