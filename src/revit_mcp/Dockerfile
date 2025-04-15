# Use the official Node.js LTS as the base image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the required dependencies
RUN npm install

# Copy the project files
COPY . .

# Build the server
RUN npm run build

# Expose the WebSocket port
EXPOSE 8080

# Set environment variables (these can also be passed as arguments)
ENV REVIT_HOST=127.0.0.1
ENV REVIT_PORT=8080

# Run the server
CMD ["node", "build/index.js"]

# Optional: Add in any extra debugging tools you might want
# Uncomment the following line to run the MCP inspector
# RUN npm run inspector