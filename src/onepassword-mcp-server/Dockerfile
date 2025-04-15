# Use an official Python image as the base image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Install uv, a fast Python package installer
RUN pip install --no-cache-dir uv

# Copy the requirements for the project and install the packages
COPY requirements.txt .
RUN uv sync

# Copy the remaining project files to the container
COPY . .

# Expose the port that the service will run on
EXPOSE 8000

# Set environment variables to ensure the Python output is set straight to the terminal without buffering it first
ENV PYTHONUNBUFFERED=1
ENV PYTHONIOENCODING=utf-8

# Define the command to run the service
CMD ["uv", "run", "--with", "mcp[cli]", "--with", "onepassword-sdk", "mcp", "run", "/app/server.py"]