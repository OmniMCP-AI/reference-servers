# Use the Node 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the entire project directory into the container
COPY . .

# Expose the port the app runs on
EXPOSE 8089

# Set environment variables configuration
# (Assuming environment variables are configured properly in the .env file)
COPY .env.example .env

# Default command to run the development server
CMD ["npm", "run", "dev"]

# To run in production, you would build and start the app with:
# CMD ["npm", "run", "build"] && ["npm", "start"]