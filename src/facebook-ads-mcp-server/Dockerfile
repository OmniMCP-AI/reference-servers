# Use the official Python image from the Docker Hub as the base image
FROM python:3.10

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file to the working directory
COPY requirements.txt .

# Install the required dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code to the working directory
COPY . .

# Set the entrypoint for the container to run the server
# Ensure to replace 'YOUR_FACEBOOK_ACCESS_TOKEN' with the actual token
ENTRYPOINT ["python", "server.py", "--fb-token", "YOUR_FACEBOOK_ACCESS_TOKEN"]