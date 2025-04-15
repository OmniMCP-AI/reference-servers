# Use the official Golang image as the base image
FROM golang:1.17-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the Go module files and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the entire project into the container
COPY . .

# Build the MCP server executable
RUN go build -o mcp-server-myssl .

# Set necessary environment variables for MySSL API
# (Values are to be set through Docker in production or testing)
ENV ACCESS_KEY=your_access_key
ENV SECRET_KEY=your_secret_key

# Specify the startup command
# Ensure the MySSL API credentials are set in your environment
CMD ["./mcp-server-myssl"]

# Expose the port that the MCP server listens on (if applicable)
# EXPOSE <port_number> # Replace <port_number> with actual port number if necessary