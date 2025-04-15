# Use the official Python image from the Docker Hub as the base image
FROM python:3.8-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file into the working directory
COPY requirements.txt .

# Install the required Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire application code into the working directory
COPY . .

# Expose the port that the MCP server will use
EXPOSE 8000

# Define environment variable needed by the application
ENV DATA_PATH /app/medicines.json

# Set the command to run the server at container startup
CMD ["python", "medicines_server.py"]