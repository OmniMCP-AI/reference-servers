# Use an appropriate base image for Python and OpenAPI tools
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Install necessary dependencies for OpenAPITools and MCP servers
# Update and install packages in one RUN layer to reduce image size
RUN apt-get update && apt-get install -y \
    curl \
    && pip install --no-cache-dir openapitools

# Copy the contents of the project into the Docker image
COPY . .

# Expose necessary ports for MCP servers
EXPOSE 8080

# Set the entry point to run the MCP server, replace `<entry_command>` with actual command
CMD ["<entry_command>"]