# Use the official Golang image as the base image
FROM golang:1.19-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum files to install dependencies
COPY go.mod go.sum ./

# Download and cache Go module dependencies
RUN go mod download

# Copy the entire project into the container
COPY . .

# Build the Go application
RUN go build -o marshal-mcp .

# Expose the port that the application will run on
EXPOSE 8000

# Command to run the executable
CMD ["./marshal-mcp", "--config=config/config.yaml"]