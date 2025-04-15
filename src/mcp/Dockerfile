# Use the official Node.js 14 image as the base image. We choose an LTS version 
# of Node.js to ensure that the environment is both stable and secure.
FROM node:14

# Set the working directory inside the container. This is where any subsequent
# commands will be run and where we'll copy our application code.
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory.
# This allows us to install dependencies separately, which maximizes the benefits
# of Docker's caching mechanism.
COPY package*.json ./

# Install the application dependencies. We use 'npm ci' to install a clean copy 
# of our dependencies defined in the package-lock.json, ensuring a consistent 
# build environment.
RUN npm ci

# Copy the rest of the application's code to the working directory. This includes 
# the source code and any additional files necessary for our application to run.
COPY . .

# Set the command to run the application. This will be the command that runs when 
# the container starts. Adjust the start script as necessary to fit the application's
# entry point.
CMD ["npm", "start"]