# Base image
FROM node:14-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install necessary dependencies
RUN npm install

# Copy project files into the container
COPY . .

# Build the project
RUN npm run build

# Command to run the application
CMD ["node", "./build/index.js"]

# Expose the port that the app runs on
EXPOSE 3000