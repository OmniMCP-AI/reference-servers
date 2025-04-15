# Use an official Node.js image as the base
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port (adjust if necessary)
EXPOSE 3000

# Set environment variables (example, adjust accordingly or use a .env file)
# ENV NOVACV_API_BASE_URL=https://api.nova-cv.com

# Provide the entry point for the application
CMD ["npm", "run", "run"]