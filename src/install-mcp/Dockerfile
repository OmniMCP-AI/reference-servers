# Use the official Node.js image as a base image
FROM node:alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Install the necessary tool globally using npx, so it doesn't need to be installed locally
# This step ensures that the `install-mcp` command is available
RUN npm install -g npx

# Add this comment to remind that no project files need to be copied as this container only runs a command

# The default command will be overwritten by the user, the following ENTRYPOINT is just a placeholder
# which can be customized according to specific installs
ENTRYPOINT ["npx", "install-mcp"]