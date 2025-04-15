# Use the official Deno image as the base image
FROM denoland/deno:alpine

# Set the working directory
WORKDIR /app

# Copy the project files into the container
COPY . .

# Install the required permissions
# Deno uses permissions flags, ensure appropriate permission is set
RUN deno cache --allow-read jsr:@miguelripoll23/docs-mcp-server

# Expose any necessary ports (if the script listens on a network interface, specify here)

# Define the command to run the app
# Replace `DIRECTORY_PATH_DOCUMENTATION_HERE` with a default directory path or handle it as an argument
ENTRYPOINT ["deno", "run", "--allow-read", "jsr:@miguelripoll23/docs-mcp-server", "DIRECTORY_PATH_DOCUMENTATION_HERE"]