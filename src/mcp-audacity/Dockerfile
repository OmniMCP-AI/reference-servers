# Use the official Python image as the base image
FROM python:3.13-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the project files into the container
COPY . /app

# Install uv tool and the project's dependencies
RUN pip install uv && \
    uv add "mcp[cli]" httpx

# Expose the port on which the MCP server will run (adjust if necessary)
EXPOSE 8000

# Command to run the MCP server using uv
ENTRYPOINT ["uv", "run", "audacity_mcp_pipe.py"]

# Add comments to explain each part of the Dockerfile
# - This Dockerfile sets up a Python environment using Python 3.13
# - Copies the project files into the container
# - Installs the project dependencies using the uv tool
# - Exposes the necessary port for the MCP server
# - Uses ENTRYPOINT to run the MCP server script via uv when the container starts