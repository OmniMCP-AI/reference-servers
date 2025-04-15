# Use the official Node.js 16 image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Ensure the JobSpy tool is available and setup
WORKDIR /jobSpy
RUN pip install -r requirements.txt
RUN chmod +x run.sh

# Set the environment variable to use JobSpy Docker image
ENV JOBSPY_DOCKER_IMAGE=jobspy

# Expose the port the app runs on
EXPOSE 9423

# Set the command to start the server
CMD ["npm", "start"]