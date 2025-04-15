# Use the official Python image from the Docker Hub as the base image
FROM python:3.7-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container at /app
COPY requirements.txt /app/

# Install Python dependencies using pip
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the rest of the application code into the container
COPY . /app

# Set environment variables for MCP server configuration
ENV PD_OSC_HOST=127.0.0.1
ENV PD_OSC_PORT=5000
ENV PD_FEEDBACK_PORT=5001

# Install 'uv' package manager
RUN apt-get update && \
    apt-get install -y curl && \
    curl -LsSf https://astral.sh/uv/install.sh | sh && \
    rm -rf /var/lib/apt/lists/*

# Expose the port used by the MCP server
EXPOSE 5000

# Set the entry point to run the MCP server
ENTRYPOINT ["uv", "--directory", ".", "run", "mcp_server.py"]
```

### requirements.txt:
```
python-osc
fastmcp
jsonschema