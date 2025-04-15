# Use the official Python image from the Docker Hub
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy requirements file to the container
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install Node.js and the MCP server
RUN apt-get update && \
    apt-get install -y nodejs npm && \
    npm install -g @openbnb/mcp-server-airbnb && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the application runs on
EXPOSE 8501

# Set environment variables
ENV OPENAI_API_KEY=your_openai_api_key

# Define the command to run the application
CMD ["python", "chatbot.py"]