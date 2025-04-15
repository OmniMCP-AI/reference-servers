# Use an official Python image from the Docker Hub as the base image
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies necessary for 'uv' and AWS CLI
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy only the requirements to cache them separately
COPY ./requirements.txt /app/requirements.txt

# Install the UV Python package manager and project dependencies
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy the entire contents of the current directory to the working directory
COPY . /app

# Expose any ports the app is designed to use
EXPOSE 80

# Set the default command to run the application
CMD ["uv", "sync", "&&", "source", ".venv/bin/activate"]