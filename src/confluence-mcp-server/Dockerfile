# Use Node.js official image as a base image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Environment variables setup (Example, make sure to set correct values)
ENV ATLASSIAN_API_TOKEN=<YOUR_API_TOKEN>
ENV CONFLUENCE_URL=https://<YOUR_DOMAIN>.atlassian.net/wiki/api/v2
ENV CONFLUENCE_EMAIL=<YOUR_EMAIL>

# Expose application port if applicable (example port number, change if needed)
# EXPOSE 3000

# Set the command to run your application
CMD [ "node", "dist/index.js" ]