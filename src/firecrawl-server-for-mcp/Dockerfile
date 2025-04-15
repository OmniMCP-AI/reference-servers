# Use Node.js LTS as the base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Create a download directory if it doesn't exist
RUN mkdir -p download

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]