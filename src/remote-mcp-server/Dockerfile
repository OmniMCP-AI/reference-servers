# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 8787

# Provide a default command to run the application
CMD ["npx", "nx", "dev", "remote-mcp-server"]

# Add a comment to indicate this image is intended for development
# To deploy, use Cloudflare Workers with `npx wrangler`