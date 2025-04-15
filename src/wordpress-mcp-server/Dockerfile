# Use the official Python image as a base image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project into the container
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Set environment variables (usually these would be set in a .env file)
# ENV WP_SITE_URL=<your_wordpress_site_url>
# ENV WP_USERNAME=<your_wordpress_username>
# ENV WP_PASSWORD=<your_wordpress_application_password>

# Set entry point to run the server as a standalone API
# You can switch to "--mcp" mode if needed
ENTRYPOINT ["python", "main.py"]