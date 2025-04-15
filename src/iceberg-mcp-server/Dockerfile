# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the project files into the container
COPY . /app

# Install the required Python packages
# Assumes a requirements.txt is present in the same directory
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port that the server runs on
EXPOSE 443

# Set environment variables for Impala connection
# It is better practice to set these variables through a docker-compose file or directly during docker run
# ENV IMPALA_HOST=coordinator-default-impala.example.com
# ENV IMPALA_PORT=443
# ENV IMPALA_USER=username
# ENV IMPALA_PASSWORD=password
# ENV IMPALA_DATABASE=default

# Entry point to run the server
# The command could be replaced based on the specific requirements or run configuration
ENTRYPOINT ["uv", "--directory", "/app", "run", "server.py"]