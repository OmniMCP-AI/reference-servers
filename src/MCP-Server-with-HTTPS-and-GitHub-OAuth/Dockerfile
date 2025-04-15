# Use Node.js base image
FROM node:16

# Set the working directory
WORKDIR /app

# Install app dependencies
COPY package.json ./
RUN npm install

# Copy the app source code
COPY . .

# Generate self-signed SSL certificates (assuming openssl is available in the image)
# You might choose to pre-generate these outside the Docker build process and COPY them in
RUN openssl genrsa -out key.pem 2048 && \
    openssl req -new -key key.pem -out csr.pem -subj "/CN=localhost" && \
    openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem

# Expose the application port
EXPOSE 3000

# Set environment variables (These should be passed at runtime for security)
ENV CLIENT_ID=your-github-client-id \
    CLIENT_SECRET=your-github-client-secret \
    REDIRECT_URI=https://localhost:3000/auth/callback \
    SESSION_SECRET=your-session-secret

# Start the server
CMD ["node", "server.js"]