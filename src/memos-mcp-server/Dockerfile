# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory in the container
COPY . .

# Expose the port that the app runs on
EXPOSE 3000

# Set environment variables (these can be overwritten by Docker Compose or directly in the Docker run command)
ENV MEMOS_URL=https://your-memos-instance.com
ENV MEMOS_API_KEY=your_api_key

# Command to run your app using MCP protocol
ENTRYPOINT ["npx", "fastmcp", "dev", "src/server.ts"]