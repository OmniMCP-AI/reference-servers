# Use the official Golang image as the base image for building the application
FROM golang:latest AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the go.mod and go.sum files to the working directory
COPY go.mod go.sum ./

# Download the Go module dependencies
RUN go mod download

# Copy the entire project to the working directory
COPY . .

# Build the Go application
RUN go build -o mcp-server-cloudbrowser-go

# Use a minimal image to run the application
FROM alpine:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the built application from the builder stage to the current stage
COPY --from=builder /app/mcp-server-cloudbrowser-go .

# Expose the necessary port (Assuming 8080, modify if needed)
EXPOSE 8080

# Set the entry point to run the application
ENTRYPOINT ["./mcp-server-cloudbrowser-go"]