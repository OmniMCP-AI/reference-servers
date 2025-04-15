import os
import asyncio
from typing import Dict, List, Any, Optional

from openai import OpenAI, AsyncOpenAI
from agents import Agent, Runner, RunConfig
from agents import OpenAIChatCompletionsModel, ModelProvider, Model
from agents import (
    function_tool,
    set_default_openai_api,
    set_default_openai_client,
    set_tracing_disabled,
)

from config import OPENAI_API_KEY, OPENAI_MODEL, OPENAI_API_BASE

BASE_URL = OPENAI_API_BASE
API_KEY = OPENAI_API_KEY
MODEL_NAME = OPENAI_MODEL

if not BASE_URL or not API_KEY or not MODEL_NAME:
    raise ValueError(
        "Please set EXAMPLE_BASE_URL, EXAMPLE_API_KEY, EXAMPLE_MODEL_NAME via env var or code."
    )

# 初始化OpenAI客户端
# 确保使用环境变量中的API基础URL
client = AsyncOpenAI(
    base_url=BASE_URL,
    api_key=API_KEY,
)
set_default_openai_client(client=client, use_for_tracing=True)
set_default_openai_api("chat_completions")
set_tracing_disabled(disabled=True)

# 定义工具函数
@function_tool
async def search_knowledge(query: str) -> str:
    """搜索知识库获取相关信息
    
    Args:
        query: 用户的查询问题
    
    Returns:
        str: 搜索结果
    """
    # 这里可以实现实际的知识库搜索逻辑
    # 示例实现，实际应用中可以连接到向量数据库等
    return f"这是关于'{query}'的搜索结果。在实际应用中，这里会返回从知识库中检索到的相关信息。"

@function_tool
async def get_current_weather(location: str) -> str:
    """获取指定位置的当前天气
    
    Args:
        location: 位置名称，如'北京'、'上海'等
    
    Returns:
        str: 天气信息
    """
    # 这里可以实现实际的天气API调用
    # 示例实现
    return f"{location}的天气晴朗，温度25°C，湿度60%。"

class ChatAgent:
    def __init__(self):
        self.agent = None
        self.initialize_agent()
    
    def initialize_agent(self):
        """初始化聊天代理"""
        self.agent = Agent(
            name="ChatAssistant",
            instructions="""你是一个友好、专业的AI助手，能够回答用户的各种问题。
            当用户询问知识相关的问题时，你可以使用search_knowledge工具搜索相关信息。
            当用户询问天气时，你可以使用get_current_weather工具获取天气信息。
            始终保持礼貌和专业，提供准确、有用的回答。
            如果你不确定答案，请诚实地告诉用户你不知道，而不是编造信息。
            """,
            model=MODEL_NAME,
            tools=[search_knowledge, get_current_weather]
        )
    
    async def process_message(self, user_message: str, conversation_history: List[Dict[str, str]] = None) -> str:
        """处理用户消息并获取代理响应
        
        Args:
            user_message: 用户的消息
            conversation_history: 对话历史记录
            
        Returns:
            str: 代理的响应
        """
        if not self.agent:
            self.initialize_agent()
        
        # 准备消息，包括历史记录
        messages = []
        if conversation_history:
            messages.extend(conversation_history)
        
        # 添加用户的新消息
        messages.append({"role": "user", "content": user_message})
        
        # 获取代理响应
        result = await Runner.run(
            self.agent,
            input=messages
        )
        
        return result.final_output
    
    def process_message_sync(self, user_message: str, conversation_history: List[Dict[str, str]] = None) -> str:
        """同步包装，便于Flask调用"""
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        try:
            return loop.run_until_complete(self.process_message(user_message, conversation_history))
        finally:
            loop.close()

# 创建全局聊天代理实例
chat_agent = ChatAgent()