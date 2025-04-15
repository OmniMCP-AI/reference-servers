from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import Tool, TextContent
from .schemas import NotificationRequest
from .notifiers import FeishuNotifier, WebSocketNotifier
from pydantic import ValidationError
import os
import logging
import json
from datetime import datetime

logger = logging.getLogger(__name__)

class NotificationServer:
    def __init__(self):
        logging.basicConfig(level=logging.INFO)
        self.server = Server("mcp-notification")
        
        # Initialize Feishu and WebSocket notifiers
        self.feishu_notifier = FeishuNotifier(
            ""
        )
        self.ws_notifier = WebSocketNotifier("ws://localhost:8765")  # Default WebSocket URL

    async def serve(self):
        @self.server.list_tools()
        async def list_tools() -> list[Tool]:
            """List available tools"""
            logger.debug("Listing tools.....")
            return [
                Tool(
                    name="send_notification",
                    description="Send system notification with optional sound",
                    inputSchema=NotificationRequest.model_json_schema(),
                )
            ]

        @self.server.call_tool()
        async def call_tool(name: str, arguments: dict) -> list[TextContent]:
            """Call a tool

            name: str - Tool name

            arguments: dict - Tool arguments
            """
            logger.info(f"Calling tool: {name} with arguments: {arguments}")
            if name != "send_notification":
                return [TextContent(type="text", text="Invalid tool name")]
            try:
                logger.debug("Validating request...")
                req = NotificationRequest(**arguments)
                logger.debug("Sending notification...")
                await self._send_notification(req)
                logger.info("Notification sent successfully")
                return [TextContent(type="text", text="Notification sent successfully")]
            except ValidationError as e:
                logger.error(f"Validation error: {str(e)}")
                return [TextContent(type="text", text=f"Invalid request: {str(e)}")]
            except Exception as e:
                logger.error(f"Error: {str(e)}")
                return [TextContent(type="text", text=f"Error: {str(e)}")]

        options = self.server.create_initialization_options()
        logger.info("Starting server...")
        async with stdio_server() as (read_stream, write_stream):
            await self.server.run(read_stream, write_stream, options)

    async def _send_notification(self, request: NotificationRequest):
        logger.debug("request: %s", request)

        # 发送到 Feishu
        try:
            self.feishu_notifier.send_notification(request.title, request.message)
        except Exception as e:
            logger.error(f"Failed to send Feishu notification: {str(e)}")

        # 发送到 WebSocket
        try:
            await self.ws_notifier.send_notification(request.title, request.message)
        except Exception as e:
            logger.error(f"Failed to send WebSocket notification: {str(e)}")

        # 将通知内容写入文件
        try:
            with open("notifications.log", "a", encoding="utf-8") as f:
                log_entry = {
                    "title": request.title,
                    "message": request.message,
                    "timestamp": str(datetime.now())
                }
                f.write(json.dumps(log_entry, ensure_ascii=False) + "\n")
        except Exception as e:
            logger.error(f"Failed to write notification to file: {str(e)}") 