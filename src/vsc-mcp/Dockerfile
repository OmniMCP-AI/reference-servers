# Use official Node.js runtime as a parent image
FROM node:16-alpine

# Install Bun for package management
RUN curl -fsSL https://bun.sh/install | bash

# Set the working directory
WORKDIR /usr/src/app

# Install project dependencies
# First, copy package.json and bun.lockb if they exist
COPY package.json bun.lockb ./
RUN bun install

# Copy the rest of the application files
COPY . .

# Set environment variables
ENV LOG_DIR=/usr/src/app/logs
ENV ALLOWED_DIRECTORIES=/usr/src/app

# Expose necessary port for the application
EXPOSE 3000

# Command to run the application
ENTRYPOINT ["bun", "src/index.ts"]