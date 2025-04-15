# Use the official Python image from the Docker Hub as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY . .

# Run pipx to install the mcp-sqlite-manager in an isolated environment
RUN pip install pipx && \
    pipx install --force .

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run the mcp-sqlite-manager command by default when the container starts
ENTRYPOINT ["mcp-sqlite-manager"]