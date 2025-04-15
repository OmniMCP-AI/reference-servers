# Use the Node.js LTS version as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependency packages
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Build the TypeScript application
RUN npm run build

# Expose the port that the application runs on
EXPOSE 3000

# Set the default command to start the server
CMD ["npm", "start"]