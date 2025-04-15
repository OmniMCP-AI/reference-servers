# Use the official Python image from the Docker Hub
FROM python:3.9-slim-buster

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose the port the app runs on (if necessary, adjust according to the app's requirements)
EXPOSE 8000

# Set environment variables for Facebook Credentials
# Ensure to provide these at runtime or manage them through Docker secrets
ENV FACEBOOK_PAGE_ACCESS_TOKEN=YOUR_PAGE_ACCESS_TOKEN
ENV FACEBOOK_PAGE_ID=YOUR_PAGE_ID

# Command to run the application
CMD ["uv", "--directory", "/app", "run", "facebook-mcp-server"]

# Note: Ensure secrets like the access token are managed securely and not hardcoded