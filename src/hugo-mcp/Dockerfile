# Base image
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Copy the project files into the container
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir uv

# Expose the required port for the server
EXPOSE 1313

# Entrypoint - Start the server using uv
ENTRYPOINT ["uv", "run", "main.py"]