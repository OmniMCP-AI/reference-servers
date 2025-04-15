# Use an official OpenJDK image as the base image
FROM openjdk:11-jre-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven project dependency file to the container
COPY pom.xml /app/
COPY src /app/src/

# Copy the project source code to the Docker image
COPY . /app

# Install maven and build the project
RUN apt-get update && \
    apt-get install -y maven && \
    mvn clean install -DskipTests

# Expose the port on which the app runs
EXPOSE 8080

# The entry point to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "target/server2mcp-spring-boot-starter-0.0.1-SNAPSHOT.jar"]