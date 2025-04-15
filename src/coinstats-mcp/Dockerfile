# Use official Node.js LTS (Long Term Support) image as the base image
FROM node:lts

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Build the project
RUN npm run build

# Set the environment variable for the CoinStats API key
# Note: Replace <YOUR_API_KEY> with the actual API key or set it through docker run command
ENV COINSTATS_API_KEY=<YOUR_API_KEY>

# Define the command to start the server using npx
ENTRYPOINT ["npx", "-y", "@coinstats/coinstats-mcp"]