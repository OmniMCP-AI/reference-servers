# Use an official Node.js runtime as a parent image
FROM node:alpine

# Set the working directory in the Docker container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json pnpm-lock.yaml ./

# Install pnpm package manager
RUN npm install -g pnpm

# Install project dependencies
RUN pnpm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN pnpm build

# Expose the port the app runs on
# EXPOSE <port-number>  # Uncomment and set the proper port if applicable

# Define the command to start the application
CMD ["pnpm", "start"]

# Note: The application config file should be adjusted if necessary to point
# to the correct build output within the Docker container environment.