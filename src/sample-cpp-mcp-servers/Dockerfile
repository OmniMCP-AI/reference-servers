# Use an official C++ runtime as a parent image
FROM gcc:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install any needed packages specified in the README or inferred from source
# In this case, let's assume some typical dependencies like cmake make
RUN apt-get update && apt-get install -y \
    cmake \
    make \
    && rm -rf /var/lib/apt/lists/*

# Compile the C++ source code
RUN g++ -o mcp-server main.cpp

# Make port 80 available to the world outside this container
EXPOSE 80

# Run the C++ application when the container launches
CMD ["./mcp-server"]