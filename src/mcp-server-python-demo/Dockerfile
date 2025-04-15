# Use the official Python image as a base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the project files into the container
COPY . /app

# Install any necessary dependencies
# (List the specific dependencies once known from the project setup files, e.g., requirements.txt, or manually here)
RUN pip install --no-cache-dir -r requirements.txt

# Open the environment in the devcontainer
# Install devbox, if required for the environment setup
# Not strictly part of Dockerfile normally, but for context:
# RUN curl -sfL https://get.jetify.sh | sh

# Entry point
CMD ["task", "mix-server:run"]