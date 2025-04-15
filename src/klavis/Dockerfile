# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install any necessary dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application into the container
COPY . .

# Expose the port your app runs on
EXPOSE 8000  # Adjust the port as necessary

# Run the application
# CMD should be adjusted according to the specific server or client you are running
# Example for running a MCP server:
CMD ["python", "mcp_servers/server.py"]
```

Ensure to adjust the `EXPOSE` line and the final `CMD` depending on the specific component (server or client) you intend to run inside the Docker container. The example provided assumes you are running a generic server script located at `mcp_servers/server.py`.