# Use the official OpenJDK as the base image
FROM openjdk:11-jre-slim

# Set the working directory
WORKDIR /app

# Copy the project files into the container
# Assuming the jar file is generated and is located in the target directory
COPY target/*.jar /app/application.jar

# Expose the application port; change if different examples use different ports
EXPOSE 8080

# Install any necessary package dependencies (if applicable)
# RUN apt-get update && apt-get install -y <additional-packages>

# Set the command to run the application
ENTRYPOINT ["java", "-jar", "/app/application.jar"]