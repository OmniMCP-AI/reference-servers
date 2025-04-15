# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to install dependencies
COPY package.json pnpm-lock.yaml ./

# Install PNPM
RUN npm install -g pnpm

# Install the project dependencies
RUN pnpm install

# Copy the entire project to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Set the environment variables
ENV SUPABASE_URL=""
ENV SUPABASE_ANON_KEY=""
ENV NEXT_PUBLIC_WEB_URL="http://localhost:3000"

# Command to run the application
CMD [ "pnpm", "dev" ]