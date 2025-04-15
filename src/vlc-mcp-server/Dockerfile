# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Install VLC and mediainfo
# VLC is needed for the HTTP interface to play and control movies
# Mediainfo is needed to get subtitles data
RUN apt-get update && \
    apt-get install -y vlc-bin vlc-plugin-base mediainfo && \
    rm -rf /var/lib/apt/lists/*

# Copy the current directory contents into the container at /app
COPY . .

# Install pip requirements
RUN pip install --no-cache-dir -r requirements.txt

# Set environment variables required for the MCP server
ENV ANTHROPIC_API_KEY your-key
ENV ROOT_VIDEO_FOLDER path/to/your/video/folder
ENV VLC_HTTP_HOST localhost
ENV VLC_HTTP_PORT 8080
ENV VLC_HTTP_PASSWORD your_password

# Expose port 8080 to allow VLC HTTP interface connections
EXPOSE 8080

# Run the server
# Use the CMD to execute the main script using uvx
CMD ["uvx", "vlc-mcp-server"]