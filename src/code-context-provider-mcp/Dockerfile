# Use the official Node.js 18 image as the base image
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Run the setup to install WASM parsers
RUN npm run setup

# Expose a port if the application listens on a specific port
# EXPOSE 8080 

# Set the entry point to run the code-context-provider-mcp command
ENTRYPOINT ["npx", "code-context-provider-mcp"]