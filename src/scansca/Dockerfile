# Use the official Golang image as the base image
FROM golang:1.22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the Go module files and download the dependencies
COPY go.mod go.sum ./
RUN go mod download && go mod verify

# Copy the rest of the application code
COPY . .

# Install make utility as it is used in the build process
RUN apk add --no-cache make

# Install project dependencies
RUN make deps

# Build the Scansca server
RUN make build

# Expose the default port the server listens on
EXPOSE 8080

# Start the server by default when the container starts
CMD ["make", "run"]