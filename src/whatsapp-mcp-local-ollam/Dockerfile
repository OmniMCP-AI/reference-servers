# Use the official Python image from the Docker Hub
FROM python:3.8-slim

# Use the official Golang image to compile Golang components
FROM golang:1.16 as golang-builder

# Set up the work directory for building Golang components
WORKDIR /app/whatsapp-bridge

# Copy only the Go modules files to optimize Docker caching
COPY whatsapp-bridge/go.mod whatsapp-bridge/go.sum ./

# Download all dependencies. Dependencies will be cached if go.mod and go.sum are not changed
RUN go mod download

# Copy the remaining application code
COPY whatsapp-bridge/. .

# Enable CGO
ENV CGO_ENABLED=1

# Install MSYS2 dependency for Windows if needed
# RUN if [ "$(uname)" == "MSYS_NT"* ]; then pacman -S mingw-w64-x86_64-gcc; fi

# Build the Go application
RUN go build -o whatsapp-mcp-server .

# Begin a new stage from the python base to run the application
FROM python:3.8-slim

# Set up the work directory for Python-related files
WORKDIR /app

# Copy the requirements file for Python dependencies
COPY requirements.txt .

# Install Python dependencies using pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Python script and other necessary files to the container
COPY whatsapp_message.py .
COPY --from=golang-builder /app/whatsapp-bridge/whatsapp-mcp-server /app/whatsapp-bridge/

# Set environment for CGO tooling on Windows
# ENV PATH="/go/bin:/usr/local/go/bin:/c/msys64/mingw64/bin:${PATH}"

# Expose the necessary port for WhatsApp MCP server (if needed)
# EXPOSE 8080

# Entrypoint to execute running tasks
ENTRYPOINT [ "python", "whatsapp_message.py" ]

# Command to execute alongside the entrypoint, if necessary
# CMD [ "send message to recipient_name 'your message'" ]