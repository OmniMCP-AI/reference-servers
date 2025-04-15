# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt or setup.py
# Note: For minimal setup, we assume pip dependencies are managed via setup.py
# For production, it might be necessary to pin dependencies versions
RUN pip install --no-cache-dir -e .

# Expose port 8080 (or the port the app runs on)
EXPOSE 8080

# Define environment variable
ENV PYTHONUNBUFFERED=1

# Run the server when the container launches
# Default entry point, you can specify another entrypoint if needed in your use
ENTRYPOINT ["python", "-m", "wordnet_mcp_server"]