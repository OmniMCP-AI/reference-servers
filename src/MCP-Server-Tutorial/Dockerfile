# Use an official Python runtime as the base image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Install uv package manager
# Using a method suitable for Linux systems since Docker containers typically run Linux
RUN apt-get update && apt-get install -y curl && \
    curl -LsSf https://astral.sh/uv/install.sh | sh && \
    # Clean up to reduce image size
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Add the uv command to PATH to ensure it is globally accessible
ENV PATH="/root/.local/bin:${PATH}"

# Copy the current directory contents into the container at /app
COPY . /app

# Install Python dependencies using uv package manager
RUN uv init mcp-server && \
    uv venv && \
    .venv/bin/activate && \
    uv add "mcp[cli]" httpx

# Expose port 8000 for the MCP server
EXPOSE 8000

# Define environment variable for Python path
ENV PYTHONPATH=/app

# Command to run when the container starts
# Assuming uv is installed correctly and 'main.py' is the entry point
ENTRYPOINT ["uv", "run", "main.py"]