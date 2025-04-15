# Use Node.js 18 as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the server
RUN npm run build

# Expose the default port (optional, change according to your app's requirements)
EXPOSE 3000

# Set environment variables (for demo purposes, can be overridden at runtime)
ENV RUNPOD_API_KEY your_api_key_here

# Define the command to start the server
CMD ["npm", "start"]

# Note: This Dockerfile expects the API key to be supplied through environment variables in your deployment configuration.