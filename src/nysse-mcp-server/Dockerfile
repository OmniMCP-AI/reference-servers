# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables (example values, to be replaced with actual credentials)
# ENV WALTTI_CLIENT_ID=your_client_id
# ENV WALTTI_CLIENT_SECRET=your_client_secret
# To use simulated data during development, set USE_SIMULATED_DATA to "true"
# ENV USE_SIMULATED_DATA=true

# Build the project
RUN npm run build

# Command to run the application
CMD ["npm", "start"]

# Add a comment indicating that an optional step to set environment variables
# through Docker CLI or orchestrator is possible instead of setting them directly here.