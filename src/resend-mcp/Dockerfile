# Use the official Node.js LTS image as the base image
FROM node:lts

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Expose the port the app runs on (if specified, otherwise specify a default one e.g., 3000)
# EXPOSE 3000

# Specify environment variables for the application (these should be set at runtime)
# ENV RESEND_API_KEY=your_api_key
# ENV SENDER_EMAIL_ADDRESS=your_sender_email_address
# ENV REPLY_TO_EMAIL_ADDRESSES=your_reply_to_email_addresses

# Command to run the application
CMD ["npx", "-y", "resend-mcp"]