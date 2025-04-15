# Use an official Golang image as the base image
FROM golang:1.19-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum files to download dependencies
COPY server/go.mod server/go.sum ./

# Download all dependencies
RUN go mod tidy

# Copy the entire MCP server project directory to the container
COPY server/ .

# Build the Go application
RUN go build -o mcpgo .

# Set environment variable to make the Go application the entry point
ENTRYPOINT ["./mcpgo"]

# Expose any necessary ports
# Example: EXPOSE 8080 (commented out as the example doesn't specify networking)
# EXPOSE 8080

# Add any additional configuration or environment variables needed for MCP server
# Example: ENV CONFIG_ENV=production (commented out as the example doesn't need it)
# ENV CONFIG_ENV=production