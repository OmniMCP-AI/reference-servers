# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Ensure the Python environment is initialized with the correct virtual environment
ENV VIRTUAL_ENV=/app/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

# Copy the entry point script and give execution permissions
COPY src/main.py /app/main.py
RUN chmod +x /app/main.py

# Copy the .env.example to .env
COPY .env.example .env

# Expose the necessary port (if your server listens to a specific port, specify it)
# EXPOSE 8000

# Run main.py when the container launches
ENTRYPOINT ["python", "/app/main.py"]