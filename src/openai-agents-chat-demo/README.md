# openai-agents-chat-demo
openai agents chat demo. integration custom llm and mcp server and function tool

基于openai-agents框架实现的聊天对话机器人。

## 功能特点

- 使用OpenAI Agents框架实现智能对话
- 支持自定义工具函数扩展能力
- 提供简洁的Web界面进行交互
- 支持对话历史记录和上下文管理

## 安装与使用

### 环境要求

- Python 3.8+
- OpenAI API密钥

### 安装依赖

```bash
pip install -r requirements.txt
```

### 配置

1. 查看config，进行自定义配置

### 运行

```bash
python app.py
```

访问 http://localhost:8050 开始使用聊天机器人。

## 项目结构

- `app.py`: Web应用主入口
- `agent.py`: 聊天代理实现
- `config.py`: 配置文件
- `templates/`: HTML模板
- `static/`: 静态资源文件
- `utils/`: 工具函数