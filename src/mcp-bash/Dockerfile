# Use the official Python image from the Docker Hub as the base image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements
# Using pip with a virtual environment inside the container is unnecessary due to container isolation
RUN pip install --no-cache-dir -e .

# Expose the port on which the server will run
EXPOSE 8000

# Set the command to run the server
CMD ["python", "-m", "mcp.cli.server", "--module", "server"]

# Use best practices by making sure the application runs as a non-root user
# RUN useradd -m mcpuser
# USER mcpuser