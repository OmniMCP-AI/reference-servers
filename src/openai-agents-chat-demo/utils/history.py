import os
import sqlite3
from typing import List, Dict, Any, Optional
from datetime import datetime
import json

from config import DATABASE_PATH

def get_db_path() -> str:
    """获取数据库文件路径"""
    # 确保utils目录存在
    os.makedirs(os.path.dirname(os.path.abspath(__file__)), exist_ok=True)
    
    # 确保数据库目录存在
    db_dir = os.path.dirname(os.path.abspath(DATABASE_PATH))
    if db_dir and not os.path.exists(db_dir):
        os.makedirs(db_dir, exist_ok=True)
    
    return DATABASE_PATH

def initialize_db() -> None:
    """初始化数据库，创建必要的表"""
    conn = sqlite3.connect(get_db_path())
    cursor = conn.cursor()
    
    # 创建消息表
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        conversation_id TEXT NOT NULL,
        username TEXT NOT NULL,
        email TEXT,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        timestamp INTEGER NOT NULL,
        logs TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    
    # 创建会话表
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS conversations (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL,
        email TEXT,
        title TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)
    
    conn.commit()
    conn.close()

def save_message(
    username: str,
    email: str,
    conversation_id: str,
    role: str,
    content: str,
    timestamp: Optional[int] = None,
    logs: Optional[str] = None
) -> None:
    """保存消息到数据库
    
    Args:
        username: 用户名
        email: 用户邮箱
        conversation_id: 会话ID
        role: 角色（'user'或'assistant'）
        content: 消息内容
        timestamp: 时间戳（毫秒）
        logs: 日志信息（可选）
    """
    if timestamp is None:
        timestamp = int(datetime.now().timestamp() * 1000)
    
    conn = sqlite3.connect(get_db_path())
    cursor = conn.cursor()
    
    # 检查会话是否存在，不存在则创建
    cursor.execute(
        "SELECT id FROM conversations WHERE id = ?",
        (conversation_id,)
    )
    if not cursor.fetchone():
        cursor.execute(
            "INSERT INTO conversations (id, username, email, title, updated_at) VALUES (?, ?, ?, ?, ?)",
            (conversation_id, username, email, "新对话", datetime.now())
        )
    else:
        # 更新会话的更新时间
        cursor.execute(
            "UPDATE conversations SET updated_at = ? WHERE id = ?",
            (datetime.now(), conversation_id)
        )
    
    # 保存消息
    cursor.execute(
        "INSERT INTO messages (conversation_id, username, email, role, content, timestamp, logs) VALUES (?, ?, ?, ?, ?, ?, ?)",
        (conversation_id, username, email, role, content, timestamp, logs)
    )
    
    # 如果是用户的第一条消息，更新会话标题
    if role == "user":
        cursor.execute(
            "SELECT COUNT(*) FROM messages WHERE conversation_id = ?",
            (conversation_id,)
        )
        if cursor.fetchone()[0] <= 1:  # 只有一条消息（当前插入的）
            # 使用用户消息的前20个字符作为标题
            title = content[:20] + "..." if len(content) > 20 else content
            cursor.execute(
                "UPDATE conversations SET title = ? WHERE id = ?",
                (title, conversation_id)
            )
    
    conn.commit()
    conn.close()

def save_bulk_history(conversation_id: str, messages: List[Dict[str, Any]]) -> None:
    """批量保存消息历史
    
    Args:
        conversation_id: 会话ID
        messages: 消息列表
    """
    conn = sqlite3.connect(get_db_path())
    cursor = conn.cursor()
    
    for msg in messages:
        role = msg.get("role")
        content = msg.get("content")
        username = msg.get("username", "Guest")
        email = msg.get("email", username)
        timestamp = msg.get("timestamp", int(datetime.now().timestamp() * 1000))
        logs = json.dumps(msg.get("logs")) if msg.get("logs") else None
        
        cursor.execute(
            "INSERT INTO messages (conversation_id, username, email, role, content, timestamp, logs) VALUES (?, ?, ?, ?, ?, ?, ?)",
            (conversation_id, username, email, role, content, timestamp, logs)
        )
    
    conn.commit()
    conn.close()

def load_history(conversation_id: str) -> List[Dict[str, str]]:
    """加载特定会话的历史记录
    
    Args:
        conversation_id: 会话ID
        
    Returns:
        List[Dict[str, str]]: 消息历史列表，格式为[{"role": "...", "content": "..."}]
    """
    conn = sqlite3.connect(get_db_path())
    cursor = conn.cursor()
    
    cursor.execute(
        "SELECT role, content FROM messages WHERE conversation_id = ? ORDER BY timestamp ASC",
        (conversation_id,)
    )
    
    history = []
    for role, content in cursor.fetchall():
        history.append({"role": role, "content": content})
    
    conn.close()
    return history

def get_conversations(username: str, limit: int = 10, offset: int = 0) -> List[Dict[str, Any]]:
    """获取用户的会话列表
    
    Args:
        username: 用户名
        limit: 返回的最大记录数
        offset: 偏移量（用于分页）
        
    Returns:
        List[Dict[str, Any]]: 会话列表
    """
    conn = sqlite3.connect(get_db_path())
    conn.row_factory = sqlite3.Row  # 使结果可以通过列名访问
    cursor = conn.cursor()
    
    cursor.execute(
        """
        SELECT id, username, email, title, created_at, updated_at 
        FROM conversations 
        WHERE username = ? 
        ORDER BY updated_at DESC 
        LIMIT ? OFFSET ?
        """,
        (username, limit, offset)
    )
    
    conversations = [dict(row) for row in cursor.fetchall()]
    conn.close()
    
    return conversations