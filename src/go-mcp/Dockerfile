# Use the official Golang image as the base image
FROM golang:1.20

# Set the working directory inside the container
WORKDIR /app

# Copy the Go modules files and download the dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the entire project into the container
COPY . .

# Build the mcpgen tool for code generation
RUN go build -o mcpgen ./cmd/mcpgen

# Generate the necessary code
RUN ./mcpgen

# Build the temperature server executable
RUN go build -o temperature ./cmd/temperature

# Set the entry point for the container
ENTRYPOINT ["./temperature"]