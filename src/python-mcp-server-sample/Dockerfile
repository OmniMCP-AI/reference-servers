# 基础镜像选择
FROM python:3.9-slim

# 工作目录设置
WORKDIR /app

# 项目依赖安装
RUN apt-get update && apt-get install -y curl \
    && curl -LsSf https://astral.sh/uv/install.sh | sh

# 复制项目文件
COPY . /app

# 安装 MCP SDK 依赖
RUN uv add "mcp[cli]"

# 暴露程序运行所需端口（假设需要端口暴露，根据实际情况调整）
EXPOSE 8000

# 入口点配置
ENTRYPOINT ["uv", "run", "server.py"]