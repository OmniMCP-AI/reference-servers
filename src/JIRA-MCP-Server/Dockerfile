# Use the official Node.js 18 image as a base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the necessary dependencies
RUN npm install

# Copy the entire project directory into the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Environment variables configuration (Example, replace with actual values)
ENV JIRA_INSTANCE_URL=http://your-jira-instance-url
ENV JIRA_API_KEY=your-jira-api-key
ENV JIRA_USER_EMAIL=your-email@example.com

# Build the TypeScript code
RUN npm run build

# Command to run the application
CMD ["npm", "start"]