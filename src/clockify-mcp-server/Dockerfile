# Use an official Node.js 16 LTS image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Install ts-node globally
RUN npm install -g ts-node

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Environment variables for Clockify API
ENV CLOCKIFY_API_URL=https://api.clockify.me/api/v1
ENV CLOCKIFY_API_TOKEN=YOUR_CLOCKIFY_API_TOKEN_HERE

# Expose the port the app runs on
# (If applicable, specify the actual port used by your app)
EXPOSE 3000

# Command to run the application using ts-node
CMD ["ts-node", "src/index.ts"]

# Documentation:
# This Dockerfile sets up a Node.js environment to run the Clockify MCP Server with ts-node.
# Make sure to replace 'YOUR_CLOCKIFY_API_TOKEN_HERE' with your actual Clockify API token before building the Docker image.