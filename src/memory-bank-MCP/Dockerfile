# Use an official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Expose the application's run-time port
EXPOSE 3000

# Define environment variable for the Gemini API key (this can also be set at runtime)
# ENV GEMINI_API_KEY=your_api_key_here

# Default command to run the application in development mode
CMD ["npm", "run", "dev"]