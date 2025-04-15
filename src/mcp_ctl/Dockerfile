# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose a port if your application listens on a specific port (optional)
# EXPOSE 8080 

# Define the command to run your application
# Here mcp_ctl would need to be installed as a global package if required
ENTRYPOINT [ "npm", "start" ]

# By default, CMD may not be necessary as ENTRYPOINT will initiate the CLI commands