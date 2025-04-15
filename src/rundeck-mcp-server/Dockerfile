# Use an official Node.js image as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies inside the container
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Expose the port the app runs on (if applicable)
# EXPOSE <port_number>

# Build the project
RUN npm run build

# Set up the entry environment variables here (optional)
ENV RUNDECK_CLI_PATH "/path/to/rundeck-cli/bin/rd"
ENV RUNDECK_BASE_URL "http://your-rundeck-server:port/"
ENV RUNDECK_API_TOKEN "your-api-token"

# Run the application
CMD [ "node", "build/index.js" ]

# Note: 
# Make sure to replace the placeholder values in ENV with actual values.
# EXPOSE line is optional and should be uncommented/replaced with actual port number if applicable.