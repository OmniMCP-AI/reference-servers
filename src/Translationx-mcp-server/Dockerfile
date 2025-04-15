# Use an official Python runtime as a parent image
FROM python:3.13-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install uv and mcp with cli dependencies
# Use pip to install required dependencies
RUN pip install uv "mcp[cli]"

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable for the TranslationX token
ENV TRANSLATIONX_TOKEN <YOUR_TRANSLATIONX_TOKEN>

# Run mcp server when the container launches
CMD ["uv", "run", "--with", "mcp[cli]", "mcp", "run", "/usr/src/app/src/main.py"]