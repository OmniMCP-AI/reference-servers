# Use the official Python image as a base image. It's good for running Python applications.
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Install uv, assuming "uv" needs to be installed beforehand.
# This command uses --no-cache-dir to save space by not caching the installation files.
RUN pip install --no-cache-dir uv

# Copy the current directory contents into the container at /app
COPY . /app

# Define environment variables, you might want to change these in the environment where the container is run.
ENV MYSQL_HOST=192.168.3.229
ENV MYSQL_PORT=3306
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=root
ENV MYSQL_DATABASE=a_llm
ENV MYSQL_ROLE=admin

# Download Python dependencies. Assuming your project uses a requirements.txt file for dependencies.
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port that the server will run on. This might need to be aligned with the actual server script.
EXPOSE 9000

# Define the command to run the application.
CMD ["uv", "run", "server.py"]