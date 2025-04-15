# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the necessary dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Expose the port that the server will run on
EXPOSE 3000

# Run the application using npx
CMD ["npx", "akhq-mcp-server"]