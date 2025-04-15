# Use Node.js as the base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install pnpm globally as the preferred package manager
RUN npm install -g pnpm

# Install project dependencies
RUN pnpm install

# Expose the default server port
EXPOSE 3333

# Set the environment variable for the FIGMA API TOKEN
# You can replace `your_token_here` with a valid token or pass it during runtime
ENV FIGMA_API_TOKEN=your_token_here

# Start the server in development mode
CMD ["pnpm", "run", "dev"]