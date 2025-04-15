# Use the official Node.js LTS version as a base image
FROM node:lts

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files for dependency installation
COPY package.json package-lock.json ./

# Install the necessary dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Command to run the application with help flag as an entry point
ENTRYPOINT ["npx", "mcp-shield", "-h"]