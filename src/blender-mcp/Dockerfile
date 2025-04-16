# Use the official Python image as a base image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Install system dependencies and Python package manager uv
RUN apt-get update && apt-get install -y \
    curl && \
    curl -fsSL https://astral.sh/uv/install.sh | sh && \
    # 添加这一行，确保 uv 在 PATH 中
    ln -s /root/.cargo/bin/uv /usr/local/bin/uv && \
    ln -s /root/.cargo/bin/uvx /usr/local/bin/uvx && \
    rm -rf /var/lib/apt/lists/*

COPY src/blender_mcp /app/blender_mcp
COPY addon.py /app/addon.py

# Start the MCP server
CMD ["uvx", "blender-mcp"]
