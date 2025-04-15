# Use an official Node.js runtime as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install necessary dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the necessary ports
# Assuming PORT=3000 in .env and MCP service runs on PORT+1 i.e., 3001
EXPOSE 3000 3001

# Copy the .env.example to .env
# Note: It's good practice to use actual environment variables at runtime rather than copying .env files in production
COPY .env.example .env

# Command to run the application
CMD ["npm", "run", "dev"]

# Note: 
# 1. Make sure to handle environment variables securely; adapt the .env handling to your deployment strategy.
# 2. If using this Dockerfile for production, consider using `npm run build` and then an appropriate start command.