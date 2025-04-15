# Use the official Golang image as a base image
FROM golang:1.20-alpine

# Set the working directory inside the container
WORKDIR /app

# Install npx and uvx and make sure they are available globally
# Install necessary packages
RUN apk add --no-cache npm \
    && npm install -g npx uvx \
    && apk add --no-cache git

# Copy go.mod and go.sum files for dependency resolution
COPY go.mod go.sum ./

# Download all the dependencies.
RUN go mod download

# Copy the rest of the application code.
COPY . .

# Build the Go application
RUN go build -o mcp-client .

# Expose the application on port 8080
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["./mcp-client"]