# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Install any needed packages specified in requirements.txt
# It's a best practice to leverage Docker's caching by copying only 
# requirements first when possible
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install the scmcp package
RUN pip install --no-cache-dir scmcp

# Make the container's port 8000 available to the outside
EXPOSE 8000

# Run scmcp as the command
CMD ["scmcp", "run", "--transport", "sse", "--port", "8000"]