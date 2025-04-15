# Use the official Python image from the Docker Hub as the base image
FROM python:3.7-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file into the working directory
COPY requirements.txt .

# Install required Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the working directory
COPY . .

# Define environment variables for configuration
ENV INPUT_FOLDER="/path/to/extracted/files"
ENV OUTPUT_FOLDER="/path/to/output/markdown"
ENV CHM_FILE_PATH="/path/to/your/file.chm"

# Specify the default command to run the application
CMD ["python", "chm_to_markdown.py"]

# Provide instructions for running the container with necessary volumes
# Note: Ensure 7-Zip is available on the host machine at specified path
# Alternatively, you might want to add a step to include 7-Zip in the container if possible