# Use the official Node.js v22 image as the base image
FROM node:22

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose necessary port (if any specific port needs to be exposed, mention here, replace 3000 with the required port)
# EXPOSE 3000

# Set the command to run when the container starts
CMD ["node", "./dist/index.js"]