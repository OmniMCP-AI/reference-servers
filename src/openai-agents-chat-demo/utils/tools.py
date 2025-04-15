from typing import Dict, List, Any, Optional
import json
import requests
from datetime import datetime

class ToolRegistry:
    """
    工具注册表，用于管理和调用自定义工具函数
    """
    def __init__(self):
        self.tools = {}
    
    def register(self, name: str, func, description: str):
        """
        注册一个工具函数
        
        Args:
            name: 工具名称
            func: 工具函数
            description: 工具描述
        """
        self.tools[name] = {
            "func": func,
            "description": description
        }
    
    def get_tool(self, name: str):
        """
        获取工具函数
        
        Args:
            name: 工具名称
            
        Returns:
            函数对象或None
        """
        tool = self.tools.get(name)
        return tool["func"] if tool else None
    
    def get_description(self, name: str) -> str:
        """
        获取工具描述
        
        Args:
            name: 工具名称
            
        Returns:
            str: 工具描述
        """
        tool = self.tools.get(name)
        return tool["description"] if tool else ""
    
    def list_tools(self) -> List[Dict[str, str]]:
        """
        列出所有可用工具
        
        Returns:
            List[Dict[str, str]]: 工具列表，每个工具包含name和description
        """
        return [
            {"name": name, "description": tool["description"]}
            for name, tool in self.tools.items()
        ]
    
    def call(self, name: str, **kwargs):
        """
        调用工具函数
        
        Args:
            name: 工具名称
            **kwargs: 传递给工具函数的参数
            
        Returns:
            工具函数的返回值
            
        Raises:
            ValueError: 如果工具不存在
        """
        tool = self.get_tool(name)
        if not tool:
            raise ValueError(f"工具 '{name}' 不存在")
        
        return tool(**kwargs)

# 创建全局工具注册表实例
tool_registry = ToolRegistry()

# 示例工具函数
def search_knowledge(query: str) -> str:
    """
    搜索知识库获取相关信息
    
    Args:
        query: 用户的查询问题
    
    Returns:
        str: 搜索结果
    """
    # 这里可以实现实际的知识库搜索逻辑
    # 示例实现，实际应用中可以连接到向量数据库等
    return f"这是关于'{query}'的搜索结果。在实际应用中，这里会返回从知识库中检索到的相关信息。"

def get_current_weather(location: str) -> str:
    """
    获取指定位置的当前天气
    
    Args:
        location: 位置名称，如'北京'、'上海'等
    
    Returns:
        str: 天气信息
    """
    # 这里可以实现实际的天气API调用
    # 示例实现
    return f"{location}的天气晴朗，温度25°C，湿度60%。"

def get_current_time() -> str:
    """
    获取当前时间
    
    Returns:
        str: 当前时间信息
    """
    now = datetime.now()
    return f"当前时间是 {now.strftime('%Y-%m-%d %H:%M:%S')}"

def calculate_expression(expression: str) -> str:
    """
    计算数学表达式
    
    Args:
        expression: 数学表达式字符串
    
    Returns:
        str: 计算结果
    """
    try:
        # 注意：eval有安全风险，实际应用中应使用更安全的方法
        result = eval(expression)
        return f"计算结果: {result}"
    except Exception as e:
        return f"计算错误: {str(e)}"

# 注册工具函数
tool_registry.register("search_knowledge", search_knowledge, "搜索知识库获取相关信息")
tool_registry.register("get_current_weather", get_current_weather, "获取指定位置的当前天气")
tool_registry.register("get_current_time", get_current_time, "获取当前时间")
tool_registry.register("calculate_expression", calculate_expression, "计算数学表达式")