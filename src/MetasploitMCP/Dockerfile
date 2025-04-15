# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port that Metasploit MCP server listens on
EXPOSE 55553

# Set up environment variables (these will be overwritten if configured during runtime in docker-compose or docker run)
ENV MSF_PASSWORD=yourpassword
ENV MSF_SERVER=127.0.0.1
ENV MSF_PORT=55553
ENV MSF_SSL=false

# Run the command to start the Metasploit MCP server
ENTRYPOINT ["python", "MetasploitMCP.py"]