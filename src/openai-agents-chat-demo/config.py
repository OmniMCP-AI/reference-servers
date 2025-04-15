import os
from dotenv import load_dotenv

# 加载环境变量
load_dotenv()

# OpenAI API配置
# 从环境变量获取API密钥，不设置默认值以避免使用无效密钥
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
OPENAI_API_BASE = os.getenv("OPENAI_API_BASE", "")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "")

# 应用配置
FLASK_DEBUG = os.getenv("FLASK_DEBUG", "True").lower() == "true"
FLASK_PORT = int(os.getenv("FLASK_PORT", 8050))

# 数据库配置
DATABASE_PATH = os.getenv("DATABASE_PATH", "chat_history.db")