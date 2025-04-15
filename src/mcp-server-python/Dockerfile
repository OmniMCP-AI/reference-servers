# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any needed packages specified in requirements.txt
# Use a virtual environment to install packages using UV
RUN python -m venv /opt/venv && \
    . /opt/venv/bin/activate && \
    pip install --no-cache-dir uv && \
    uv pip install -r requirements.txt

# Make sure the venv binaries are on PATH
ENV PATH="/opt/venv/bin:$PATH"

# Make ports available to the world outside this container
EXPOSE 80

# Run main.py when the container launches
CMD ["python", "main.py"]