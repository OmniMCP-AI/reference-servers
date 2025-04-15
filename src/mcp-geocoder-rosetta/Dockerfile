# Use official Python image as a parent image
FROM python:3.13-slim

# Set the working directory inside the container
WORKDIR /app

# Copy project dependencies for Python with Google Maps SDK
COPY python-googlemaps/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire Python Google Maps SDK implementation into the container
COPY python-googlemaps /app

# Set environment variables for Google Maps API key (dummy key, should be overridden)
ENV GOOGLE_MAPS_API_KEY="your-api-key-here"

# Expose ports that the geocoder service listens on
EXPOSE 8080

# Set the default command to run the geocoder
CMD ["uv", "run", "--with", "mcp[cli]", "--with", "googlemaps", "mcp", "run", "geocoder.py"]