# Use an official OpenJDK runtime as a parent image
FROM openjdk:21-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Install necessary packages
# Note: No additional packages are needed for the server as per the provided details

# Copy the project files into the container
COPY . /app

# Expose the port that the MCP server runs on
EXPOSE 8080

# Define environment variables (usually overridden in production)
ENV jdbc.url=jdbc:virtuoso://localhost:1111
ENV jdbc.user=dba
ENV jdbc.password=dba
ENV jdbc.api_key=xxx

# Utilize Quarkus fast-jar for optimal bootstrap time
RUN ./mvnw package

# Define the command to run the application
CMD ["java", "-jar", "/app/target/MCPServer-1.0.0-runner.jar"]

# Provide informational note about environment variables
# It is advisable to use a '.env' file or an external secret management solution in production