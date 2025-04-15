# Use the official Python image from the Docker Hub as the base image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file into the container at /app
COPY requirements.txt .

# Install the required dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire contents of the current directory to /app in the container
COPY . .

# Set environment variables
# The OBSIDIAN_VAULT_PATH can be configured during runtime as needed
ENV OBSIDIAN_VAULT_PATH=/path/to/your/obsidian/vault

# Expose the port the app runs on (update if different)
EXPOSE 8000

# Command to run the application
CMD ["python", "main.py"]