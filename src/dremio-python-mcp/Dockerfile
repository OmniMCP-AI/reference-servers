# Use the official Python 3.10 image from the Docker Hub
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
# For this example, we're assuming the necessary dependencies are listed in requirements.txt
RUN pip install --no-cache-dir -e .

# Expose port 32010 to the outside world
EXPOSE 32010

# Run mcp-dremio-server when the container launches
CMD ["mcp-dremio-server"]

# Add comments to explain key parts of the Dockerfile
# - The base image is `python:3.10-slim`, which is a minimal Python 3.10 environment.
# - The working directory is set to `/app`.
# - The project contents are copied into the `/app` directory in the container.
# - Python dependencies are installed using pip.
# - Port 32010 is exposed for accessing the MCP server.
# - The command to execute when the container starts is `mcp-dremio-server`.