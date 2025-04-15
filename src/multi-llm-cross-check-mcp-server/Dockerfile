# Use the official Python image with version 3.8 as the base image
FROM python:3.8-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the uv package manager and other dependencies
RUN pip install uv && \
    pip install -r requirements.txt

# Copy the entire application directory into the container
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Define environment variables required by the app (to be configured at runtime)
ENV OPENAI_API_KEY= \
    ANTHROPIC_API_KEY= \
    PERPLEXITY_API_KEY= \
    GEMINI_API_KEY=

# Set the default command to run the application using uv
CMD ["uv", "run", "main.py"]