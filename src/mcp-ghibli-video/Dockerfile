# Use official Node.js LTS image as the base image
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the TypeScript server
RUN npm run build

# Expose a specific port if necessary for your application (optional)
# EXPOSE 3000

# Set the environment variable for API URL
ENV Ghibli_API_URL=https://www.gpt4oimg.com

# Define the entry point for the container
CMD ["npx", "-y", "@openmcprouter/mcp-server-ghibli-video"]

# Note: Ensure to have your API key set in the Claude Desktop config or ENV when running the container