# Use the Nixpacks base image for building applications
FROM nixpacks-build:latest 

# Set the working directory
WORKDIR /app

# Copy the project files into the Docker container
COPY . .

# Install project dependencies using the Nixpacks standard script
# Nixpacks will automatically detect and install required dependencies for the project
RUN nixpacks-install

# Expose the necessary port for MCP server communication, e.g., 8000
EXPOSE 8000

# Set the entry point for the Docker container
ENTRYPOINT ["nixpacks-start"]