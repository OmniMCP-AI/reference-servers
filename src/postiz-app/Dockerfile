# Use the official Node.js image as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for proper caching of npm install
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory into the container
COPY . .

# Set environment variable
ENV NODE_ENV=production

# Expose the necessary port
EXPOSE 3000

# Set the entry point to start the application
CMD ["npm", "run", "start"]