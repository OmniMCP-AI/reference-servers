# Use official Node.js 16 as a base image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy rest of the application code
COPY . .

# Expose the application's port
EXPOSE 3000

# Set default environment variables path
ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]