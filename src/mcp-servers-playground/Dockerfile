# Use official Node.js v18 base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define environment variable for Node.js server
ENV NODE_ENV=production

# Start the specified server using npm start as the entry point
# Default entry point is JSONPlaceholder server
CMD ["npm", "start"]