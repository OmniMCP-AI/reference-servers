# Use the official Python base image with Python 3.8
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements and project file into the container
COPY mcp_weather_sse.py /app/mcp_weather_sse.py

# Install Python dependencies
# Installing 'mcp' and 'requests' as mentioned in the README.md
RUN pip install mcp requests

# Expose the default port number the server listens on
EXPOSE 3001

# Set environment variable for OpenWeatherMap API Key
# Users should provide their own API key through this environment variable
ENV OPENWEATHER_API_KEY=""

# Command to run the application
CMD ["python", "mcp_weather_sse.py"]