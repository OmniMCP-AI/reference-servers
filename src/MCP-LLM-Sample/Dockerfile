# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install the required Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Expose the necessary ports
EXPOSE 8000 8001 8002 8501

# Set environment variable for OpenAI API key, to be overridden at runtime
ENV OPENAI_API_KEY=your_openai_api_key_here

# Start MCP servers and client
# Use a script to start all necessary services
CMD ["sh", "-c", "cd mcp_servers && \
    nohup python math_mcp_server.py > math.log 2>&1 & \
    nohup python weather_mcp_server.py > weather.log 2>&1 & \
    nohup python which_llm_to_use_mcp_server.py > which_llm.log 2>&1 & \
    cd /app && streamlit run my_chat_bot_app.py"]