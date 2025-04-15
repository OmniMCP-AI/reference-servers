# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the project files into the container
COPY . .

# Expose the port the server will run on
EXPOSE 3000

# Set the environment variable for the API key (should be overridden in production)
ENV JOBNIMBUS_API_KEY=your_actual_api_key_here

# Define the command to run the server
CMD ["npx", "jobnimbus-mcp-server"]