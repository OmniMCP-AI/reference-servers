import json
from typing import List, Dict, Any, Optional

class ConversationContext:
    """
    管理对话上下文的类，用于跟踪和维护对话历史
    """
    def __init__(self, max_tokens: int = 4000):
        """
        初始化对话上下文管理器
        
        Args:
            max_tokens: 上下文的最大token数量
        """
        self.messages = []
        self.max_tokens = max_tokens
    
    def add_message(self, role: str, content: str) -> None:
        """
        添加消息到上下文
        
        Args:
            role: 消息发送者角色 ('user' 或 'assistant')
            content: 消息内容
        """
        self.messages.append({"role": role, "content": content})
        self._trim_context_if_needed()
    
    def get_context(self) -> List[Dict[str, str]]:
        """
        获取当前上下文
        
        Returns:
            List[Dict[str, str]]: 当前上下文消息列表
        """
        return self.messages.copy()
    
    def clear(self) -> None:
        """
        清空上下文
        """
        self.messages = []
    
    def _trim_context_if_needed(self) -> None:
        """
        如果上下文过长，裁剪最早的消息
        """
        # 简单实现：保留最近的N条消息
        # 实际应用中可以使用更复杂的token计数方法
        if len(self.messages) > 20:  # 保留最近20条消息
            self.messages = self.messages[-20:]
    
    def to_json(self) -> str:
        """
        将上下文转换为JSON字符串
        
        Returns:
            str: JSON格式的上下文
        """
        return json.dumps(self.messages, ensure_ascii=False)
    
    @classmethod
    def from_json(cls, json_str: str) -> 'ConversationContext':
        """
        从JSON字符串创建上下文
        
        Args:
            json_str: JSON格式的上下文字符串
            
        Returns:
            ConversationContext: 新的上下文对象
        """
        context = cls()
        context.messages = json.loads(json_str)
        return context
    
    def from_history(self, history: List[Dict[str, str]]) -> None:
        """
        从历史记录加载上下文
        
        Args:
            history: 历史消息列表
        """
        self.messages = history.copy()
        self._trim_context_if_needed()