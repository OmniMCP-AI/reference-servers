# Base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the project files
COPY . .

# Set the environment variable for the YAPI instance URL
# (You can override this default in docker-compose or at runtime)
ENV YAPI_URL=http://your-yapi-instance.com

# Expose the necessary port (if any, otherwise omit)
# EXPOSE <port-number>

# Command to run the server with npx
# Note that the 'yapi_project_token' should be passed as an environment variable at runtime
ENTRYPOINT ["npx", "-y", "@modelcontextprotocol/server-yapi"]