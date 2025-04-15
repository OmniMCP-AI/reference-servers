# Use an official Python runtime as a parent image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Install uv, the dependency manager
RUN pip install uv

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in pyproject.toml
RUN uv pip install -e .

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable for any configurations (if necessary, you can add more variables)
COPY .env /app/.env

# Run main.py when the container launches
CMD ["python", "main.py"]