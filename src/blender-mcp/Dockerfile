# Use the official Python image as a base image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Install system dependencies and Python package manager uv
RUN apt-get update && apt-get install -y \
    curl && \
    curl -fsSL https://astral.sh/uv/install.sh | sh && \
    rm -rf /var/lib/apt/lists/*

# Copy the MCP Server files into the working directory
COPY ./src/blender_mcp /app/blender_mcp

# Copy the Blender Addon file
COPY ./addon.py /app/addon.py

# Expose the port that the MCP server listens on
EXPOSE 8000

# Start the MCP server
CMD ["uvx", "blender-mcp"]