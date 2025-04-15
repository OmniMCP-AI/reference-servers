# Use an official Node.js image as the base
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application source code into the container
COPY . .

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]