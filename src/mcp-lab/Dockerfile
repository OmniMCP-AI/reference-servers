# Use the official Python image from the Docker Hub
FROM python:3.9

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed dependencies specified in requirements.txt
# Use a virtual environment for best practices
RUN python -m venv venv
RUN . /venv/bin/activate && pip install --no-cache-dir -r requirements.txt

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Define environment variable
ENV PYTHONUNBUFFERED=1

# Run the application
# Assuming there's a file named 'app.py' to start the MCP server-client example
ENTRYPOINT [".", "/venv/bin/activate", "&&", "python", "app.py"]