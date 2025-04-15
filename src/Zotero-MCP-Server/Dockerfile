# Use the official Python image from the Docker Hub as a base image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt ./

# Install the uv package manager and other dependencies
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install uv

# Copy the current directory contents into the container at /app
COPY . .

# Set environment variables
# [NOTE: Add your own .env file with credentials for library ID and type]
COPY .env .env

# Install the package using uv
RUN uv pip install .

# Expose the port the app runs on (if applicable)
# EXPOSE 5000 (Uncomment if needed for network communication)

# Define the command to run the application
CMD ["uv", "run", "--directory", "/app", "-m", "src.zotero_mcp_server.zotero_mcp_server"]

# Note:
# This Dockerfile assumes that 5ire configuration and .env file are properly set before running the container.
# Ensure you have an accurate path to the Zotero-MCP-Server directory in the 5ire configuration.