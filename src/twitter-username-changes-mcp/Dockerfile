# Use the official Python image as a parent image
FROM python:3.10-slim

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements
# Using virtual environments for isolated install
RUN pip install mcp[cli] requests

# Make port 80 available to the world outside this container
EXPOSE 80

# Run main.py when the container launches
CMD ["mcp", "dev", "main.py"]