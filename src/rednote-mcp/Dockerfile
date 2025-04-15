# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# If you are building your code for production
# RUN npm ci --only=production

# Copy the current directory contents into the container at /app
COPY . .

# Install Playwright dependencies
RUN npx playwright install

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Define environment variable
ENV NODE_ENV=production

# Run the app using the command line tool
ENTRYPOINT ["npx", "rednote-mcp", "--stdio"]