# Use the official Node.js 16 image as a base image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install the mcp-postgres-server package dependencies
RUN npm install mcp-postgres-server

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Set environment variables required for the PostgreSQL connection
# These should be configured appropriately in a docker-compose file or passed at runtime
ENV PG_HOST=your_host
ENV PG_PORT=5432
ENV PG_USER=your_user
ENV PG_PASSWORD=your_password
ENV PG_DATABASE=your_database

# Define the command to run the application
CMD ["npx", "mcp-postgres-server"]

# Expose the port the service runs on
EXPOSE 5432