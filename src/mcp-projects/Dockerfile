# Use the official Python image from the Docker Hub as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install the required packages
RUN pip install --no-cache-dir mcp \
    && pip install --no-cache-dir fastapi \
    && pip install --no-cache-dir uvicorn \
    && pip install --no-cache-dir fastapi-mcp \
    && pip install --no-cache-dir llama-index \
    && pip install --no-cache-dir llama-index-embeddings-huggingface \
    && pip install --no-cache-dir llama-index-llms-langchain \
    && pip install --no-cache-dir langchain-mcp-adapters

# Expose the port on which the app will run
EXPOSE 8000

# Define environment variables
ENV API_KEY=<IBM_cloud_API_Key>
ENV PROJECT_ID=<Watsonx_Project_id>
ENV IBM_CLOUD_URL=<IBM_cloud_url>

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]