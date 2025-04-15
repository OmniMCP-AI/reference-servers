import requests
import websockets
import json
import logging
import asyncio
from typing import Optional

logger = logging.getLogger(__name__)

class FeishuNotifier:
    def __init__(self, webhook_url: str):
        self.webhook_url = webhook_url

    def send_notification(self, title: str, message: str) -> bool:
        """Send notification to Feishu webhook"""
        try:
            payload = {
                "msg_type": "text",
                "content": {
                    "text": f"{title}\n{message}"
                }
            }
            response = requests.post(
                self.webhook_url,
                headers={"Content-Type": "application/json"},
                data=json.dumps(payload)
            )
            if response.status_code == 200:
                logger.info("Feishu notification sent successfully")
                return True
            else:
                logger.error(f"Failed to send Feishu notification: {response.text}")
                return False
        except Exception as e:
            logger.error(f"Error sending Feishu notification: {str(e)}")
            return False

class WebSocketNotifier:
    def __init__(self, ws_url: str):
        self.ws_url = ws_url
        self.connection: Optional[websockets.WebSocketClientProtocol] = None

    async def connect(self):
        """Establish WebSocket connection"""
        try:
            self.connection = await websockets.connect(self.ws_url)
            logger.info("WebSocket connection established")
            return True
        except Exception as e:
            logger.error(f"Failed to establish WebSocket connection: {str(e)}")
            return False

    async def send_notification(self, title: str, message: str) -> bool:
        """Send notification via WebSocket"""
        if not self.connection:
            if not await self.connect():
                return False

        try:
            payload = {
                "type": "notification",
                "title": title,
                "message": message
            }
            await self.connection.send(json.dumps(payload))
            logger.info("WebSocket notification sent successfully")
            return True
        except Exception as e:
            logger.error(f"Error sending WebSocket notification: {str(e)}")
            self.connection = None
            return False

    async def close(self):
        """Close WebSocket connection"""
        if self.connection:
            try:
                await self.connection.close()
                logger.info("WebSocket connection closed")
            except Exception as e:
                logger.error(f"Error closing WebSocket connection: {str(e)}")
            finally:
                self.connection = None 