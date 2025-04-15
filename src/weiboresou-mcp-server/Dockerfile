# Use the official Python image based on Python 3.11 as the base image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the necessary dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose any ports the application needs to be accessible to the world outside this container
# (Assuming the default Flask port, if using a different port in resou_sse.py, update as needed)
EXPOSE 5000

# Command to run the application
# Assuming the main entry point for 'sse mode' as mentioned in the README
ENTRYPOINT ["python", "resou_sse.py"]