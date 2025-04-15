# Use the official Node.js 16 image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install necessary dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Make the main script executable
RUN chmod +x index.js

# Expose the port the app runs on (if applicable)
# EXPOSE 3000

# Entry point for running the server, replace YOUR_MIXPANEL_TOKEN with your actual token
ENTRYPOINT ["./index.js", "--token", "YOUR_MIXPANEL_TOKEN"]

# For verbose logging, you can uncomment the line below and comment the above ENTRYPOINT
# ENTRYPOINT ["./index.js", "--token", "YOUR_MIXPANEL_TOKEN", "--debug"]