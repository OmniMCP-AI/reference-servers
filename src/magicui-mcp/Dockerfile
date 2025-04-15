# Use an official node runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install necessary dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the project (necessary if using TypeScript or similar)
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Run the application
# Using npx to run the @magicuidesign/mcp package as intended in the setup
# The CMD here is used as an entrypoint suitable if the npm package has a cli entry point defined
CMD [ "npx", "-y", "@magicuidesign/mcp" ]