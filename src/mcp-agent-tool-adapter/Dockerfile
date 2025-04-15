# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the requirements file into the container at /usr/src/app/
COPY requirements.txt ./

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /usr/src/app/
COPY . .

# Set the default command to run when starting the container
# Here we assume you're using the Google ADK CLI agent by default
ENTRYPOINT ["python", "app_client_adk.py"]

# Provide instructions if you wish to start with LangGraph agent
# Use ENTRYPOINT ["python", "app_client_langgraph.py"] for LangGraph CLI agent