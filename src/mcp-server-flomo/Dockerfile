# Use the official Node.js 16 base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install the necessary dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Ensure the environment variables file is available
COPY .env.example .env

# Expose the port the app runs on
EXPOSE 3000

# Document that the service uses port 3000
# CMD ["node", "build/index.js"] - replace with the appropriate start command if different

# Define the command to run your app using the build script
CMD ["npm", "run", "build"]