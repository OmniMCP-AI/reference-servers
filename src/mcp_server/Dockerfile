# Use the official Node.js LTS as a base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json tsconfig.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code
COPY src ./src

# Compile TypeScript to JavaScript
RUN npm run build

# Copy the compiled JavaScript files to the working directory
COPY build ./build

# Specify default command to run when starting the container
CMD ["node", "build/index.js"]