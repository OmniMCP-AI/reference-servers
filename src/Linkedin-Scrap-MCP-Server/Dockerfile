# Use the official Python image from the Docker Hub as a parent image
FROM python:3.7-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements from README.md and install dependencies
# Install mcp and other required packages
RUN pip install uvicorn mcp[cli] httpx requests

# Copy the entire contents of the current directory to /app in the container
COPY . /app

# Expose port 8000
EXPOSE 8000

# Command to set up the environment variable for the RAPIDAPI_KEY
# Ideally, you would pass this in at runtime for security reasons
# ENV RAPIDAPI_KEY=your_rapidapi_key_here

# Command for running the server - replace `linkedin.py` with your actual entry point script
CMD ["uvicorn", "linkedin:app", "--host", "0.0.0.0", "--port", "8000"]

# Notes:
# - Ensure linkedin.py is correctly set up as the module with an ASGI app, typically linkedin:app
# - The RAPIDAPI_KEY should be securely managed, potentially using Docker secrets or run-time environment variables.