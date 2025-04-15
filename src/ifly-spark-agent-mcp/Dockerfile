# Use the official Python image as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any required packages specified in requirements.txt
# Use the --no-cache-dir option to reduce the image size by not caching the pip packages 
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 8000 for SSE transport if needed
EXPOSE 8000

# Add environment variables if necessary for IFLY configurations
ENV IFLY_SPARK_AGENT_BASE_URL=xxxx \
    IFLY_SPARK_AGENT_APP_ID=xxxx \
    IFLY_SPARK_AGENT_APP_SECRET=xxxx

# Run the server using the stdio transport by default
# ENTRYPOINT defines the command to run on container start
ENTRYPOINT ["uv", "run", "ifly-spark-agent-mcp"]