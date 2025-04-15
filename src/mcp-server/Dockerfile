# Use the official Node.js image as a base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the necessary dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Specify environment variables for running the project
# Make sure to replace <YOUR_TOKEN> with your actual OSC access token
ENV OSC_ACCESS_TOKEN=<YOUR_TOKEN>

# Expose a port if necessary, for example, if your application listens on a specific port
# EXPOSE 8080

# Define the command to run your application
CMD ["npx", "@modelcontextprotocol/inspector", "-e", "OSC_ACCESS_TOKEN=$OSC_ACCESS_TOKEN", "npx", "tsx", "src/index.ts"]