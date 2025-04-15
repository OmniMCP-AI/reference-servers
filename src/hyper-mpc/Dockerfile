# Use an official Node.js LTS (Long Term Support) as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Install project dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Environment variable for MCP configuration
ENV CONFIG_PATH="/path/to/hyper.mcp.json"

# Command to run the application
# The entrypoint will ensure it uses npx and the correct MCP configuration
CMD ["npx", "@cute-engineer/hyper-mcp", "/path/to/hyper.mcp.json"]

# Expose any ports the app might use (it's not specified in README, so this is optional to specify)
# EXPOSE 3000