# Use Node.js v16 as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the entire project into the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables required for the app
ENV ENJIN_API_ENDPOINT=https://platform.canary.enjin.io/graphql

# Define the command to run the application
CMD ["node", "build/index.js"]