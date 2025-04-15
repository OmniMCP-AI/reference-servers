# Start from a base image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Install required dependencies
# Assuming 'uv' needs to be installed via pip
RUN pip install uv

# Copy the project files into the Docker image
COPY . /app

# Set the environment variable for the API key (this should be replaced with your actual key during runtime)
ENV FINAGE_API_KEY=YOUR_API_KEY_HERE

# Execute the command to run the server via 'uv'
# This command needs to be aligned with how the application is run locally
CMD ["uv", "--directory", "/app/finage_mcp", "run", "finage_mcp"]