# Use the official Python image from the Docker Hub as a parent image
FROM python:3.9-slim

# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install the dependencies
# Assuming there is a requirements.txt for dependency management, 
# if not, dependencies need to be manually listed here.
RUN if [ -f "requirements.txt" ]; then pip install --no-cache-dir -r requirements.txt; fi

# Expose the port the app runs on, assuming server.py is configured to run on port 5000
EXPOSE 5000

# Run server.py when the container launches
ENTRYPOINT ["python", "server.py"]