# Use the official Python image from the Docker Hub
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
# It's a common practice to have a requirements.txt for dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Make the container's port 80 available to the outside
EXPOSE 80

# Define environment variable
ENV NAME World

# Run the application
# Use CMD as it allows us to override it in docker run
CMD ["python", "app.py"]
```

请根据您的具体项目需求修改基础 Python 版本、工作目录、安装依赖和应用的启动命令等内容。