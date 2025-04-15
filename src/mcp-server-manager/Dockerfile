# Use the official Python image as the base image
FROM python:3.10-slim-buster

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file and install the dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project into the container
COPY . .

# Expose any relevant port if needed (example: 8080)
# EXPOSE 8080

# Set the entry point to the GUI launcher
ENTRYPOINT ["python", "gui/app.py"]

# Alternatively, to start with CLI, uncomment the line below and comment the above
# ENTRYPOINT ["python", "cli/launcher.py"]