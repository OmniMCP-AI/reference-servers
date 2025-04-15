# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8787

# Define the command to run the application
CMD ["npx", "nx", "dev", "remote-mcp-server"]

# Notes:
# - Use multi-stage builds if you have build tools or compile steps to optimize Docker image size.
# - Use specific versions for NPM packages to ensure consistent builds.
# - Consider adding a .dockerignore file to reduce the build context size.