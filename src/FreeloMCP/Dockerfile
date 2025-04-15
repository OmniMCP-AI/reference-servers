# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose the application port
EXPOSE 3000

# Specify environment variables for the MCP server
ENV NODE_ENV=production
ENV PORT=3000

# Define the command to run the MCP server
CMD ["npm", "run", "mcp"]

# Add some comments explaining how the environment variables are used
# - NODE_ENV: Set to 'production' to ensure the server runs with optimized settings
# - PORT: The port on which the MCP server will listen