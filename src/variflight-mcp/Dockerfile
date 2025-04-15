# Use the official Node.js LTS image as the base image
FROM node:lts

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install @variflight-ai/variflight-mcp package globally using npx
# The -y flag is used to skip confirmation prompts
RUN npx -y @variflight-ai/variflight-mcp

# Copy project files into the container
COPY . .

# Define environment variable for Variflight API key
# This should be provided at runtime for security reasons
# ENV VARIFLIGHT_API_KEY your_api_key_here

# Placeholder for setting up entry point or starting the server
# This may need to be adjusted based on how the package expects to be invoked
ENTRYPOINT ["npx"]

# Command to run the Variflight MCP tool with necessary arguments
CMD ["@variflight-ai/variflight-mcp"]