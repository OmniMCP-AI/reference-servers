# Use the official Python image as base
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements from the README and install them
COPY requirements.txt ./

# Install the required dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project into the container
COPY . .

# Expose any necessary ports (if required by the server, not specified in README)
# EXPOSE 5000

# Command to run the Outlook MCP server
CMD ["python", "outlook_mcp_server.py"]
```

Note: Create a `requirements.txt` based on the dependencies listed in the README:
```
mcp>=1.2.0
pywin32>=305