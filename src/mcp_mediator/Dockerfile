# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the Maven project file
COPY pom.xml /app

# Copy the entire project source to the container
COPY src /app/src

# Install Maven to build the application
RUN apt-get update && \
    apt-get install -y maven && \
    mvn -f /app/pom.xml clean package && \
    rm -rf /var/lib/apt/lists/*

# Define environment variable for the JAR file
ENV JAR_FILE=/app/target/mcp-mediator.jar

# Copy the built JAR file into the container
COPY target/*.jar $JAR_FILE

# Run the application
ENTRYPOINT ["java", "-jar", "/app/target/mcp-mediator.jar"]