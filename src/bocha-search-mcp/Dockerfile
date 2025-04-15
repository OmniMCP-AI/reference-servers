# Use the official Node.js LTS image as a base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Set environment variables (Replace with your actual API key or pass it via docker-compose or at runtime)
ENV BOCHA_API_KEY=your_api_key_here

# Expose the port that your app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["npx", "@modelcontextprotocol/inspector", "uv", "--directory", "/usr/src/app", "run", "bocha-search-mcp"]