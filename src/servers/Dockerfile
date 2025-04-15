# Use the official Python image as a parent image
FROM python:3.10-slim

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entry point script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define environment variable
ENV NAME ModelContextProtocolServer

# Run entrypoint.sh when the container launches
ENTRYPOINT ["/entrypoint.sh"]
```

**Note**: This `Dockerfile` assumes that the project dependencies are listed in `requirements.txt` and that there is an `entrypoint.sh` script to start the server on port 8000. Depending on the actual server configuration (such as TypeScript or additional environment configurations described in your `README.md`), you may need to adjust the content accordingly.