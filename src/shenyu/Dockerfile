# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the project files to the container
COPY . /app

# Install any required dependencies
# This step can be adjusted if there are specific dependencies or build tools needed

# Expose the port the application listens on
EXPOSE 9195

# Define environment variables
ENV SHENYU_LOCAL_ENABLED=true
ENV SHENYU_SYNC_WEBSOCKET_URLS=ws://shenyu-admin-quickstart:9095/websocket

# Command to run the application
ENTRYPOINT ["java", "-jar", "shenyu-bootstrap.jar"]