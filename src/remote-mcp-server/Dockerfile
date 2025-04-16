# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project files into the container
COPY . .

# Expose the port the application will run on
EXPOSE 8787

# Set the command to start the application
CMD ["npx", "nx", "dev", "remote-mcp-server"]