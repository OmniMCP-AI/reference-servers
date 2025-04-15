# Use an official Node.js LTS image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the npm dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the MCP server will listen on
EXPOSE 9000

# Authenticate using the TAILOR_TOKEN environment variable, recommended to set this in runtime
ENV TAILOR_TOKEN=your_token_here

# Set the default command to run the MCP server
CMD ["npx", "tailorctl", "mcp", "--transport=http", "--listen=0.0.0.0:9000"]

# Note: Ensure that the TAILOR_TOKEN is set to your actual token at runtime for authentication