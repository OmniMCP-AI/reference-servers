# Use the official Python image as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file into the container
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire application into the container
COPY . .

# Expose port on which the application will run (if needed)
# EXPOSE 8000

# Set the default command to run the application
CMD ["python", "main.py"]

# Note: Ensure credentials.json is securely managed and available at runtime