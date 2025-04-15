# Use official Node.js LTS as a base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Install required dependencies globally
# Using npx does not require a global installation, we ensure the tool `tsx` is available
RUN npm install -g tsx

# Copy project files into the Docker image
COPY . .

# Set the command to run your application
# We use ENTRYPOINT to ensure the container runs the MCP server defined in the README
ENTRYPOINT ["npx", "-y", "tsx", "/path/to/your/mcp/symbol-mcp-server/src/index.ts"]