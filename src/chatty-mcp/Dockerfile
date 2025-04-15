# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install necessary dependencies
RUN npm install

# Copy the rest of the application files into the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Set the command to run the application
CMD ["npm", "start"]