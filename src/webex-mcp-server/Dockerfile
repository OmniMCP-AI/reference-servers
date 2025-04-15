# Use the official Node.js 16 image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json ./
COPY package-lock.json ./

# Install app dependencies, clean the npm cache after installation
RUN npm install && npm cache clean --force

# Copy the rest of the application code to the working directory
COPY . .

# Build the project
RUN npm run build

# Expose necessary port for MCP Inspector (default: 5173)
EXPOSE 5173

# Set environment variable placeholder
ENV WEBEX_ACCESS_TOKEN=your_webex_access_token

# Use the build file as the entry point
CMD ["node", "dist/index.js"]

# Note: Ensure you replace 'your_webex_access_token' with a valid Webex access token in your environment variable setup