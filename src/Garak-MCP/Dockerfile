# Use the official Python 3.11 image from the Docker Hub as the base image
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install necessary dependencies
# Using `uv` as instructed, and assuming additional package dependencies exist in a requirements file
RUN pip install --no-cache-dir uv

# Expose the port that the app runs on. Need to confirm the actual port used by the app.
EXPOSE 8080

# Define the entrypoint, starting the server as described in the README
ENTRYPOINT ["uv", "--directory", "/app", "run", "garak-server"]