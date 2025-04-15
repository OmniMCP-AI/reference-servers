# Use the official Node.js image as a base image
FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript project
RUN npm run build

# Expose port if necessary (uncomment and set correct port if applicable)
# EXPOSE 3000

# Set environment variable for Azure DevOps PAT
# This line can be commented out if you're passing ENV at runtime
# ENV AZURE_DEVOPS_PAT=your_pat_here

# Command to run the application
CMD ["npm", "start"]