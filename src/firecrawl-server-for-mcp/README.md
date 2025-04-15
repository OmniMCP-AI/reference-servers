# Firecrawl Server for MCP

Express API server for Firecrawl that provides endpoints for web crawling and scraping functionality.

## Features

- Scrape a single URL
- Scrape multiple URLs in batch
- Crawl a website and scrape all pages

## Docker Setup

This project can be easily run using Docker and Docker Compose. Docker Compose allows you to define, manage, and run multi-container Docker applications with ease.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Docker Compose Commands

#### Build and Start the Container

```bash
# Build and start in detached mode
docker compose up -d

# Build the image without starting the container
docker compose build

# Build with no cache (force rebuild)
docker compose build --no-cache

# Build and start with logs in console (not detached)
docker compose up
```

#### Manage the Container

```bash
# Stop the container
docker compose stop

# Stop and remove the container
docker compose down

# Stop and remove the container and volumes
docker compose down -v

# View container logs
docker compose logs

# Follow container logs
docker compose logs -f

# Restart the container
docker compose restart
```

#### Scaling (if needed)

```bash
# Scale the service to multiple instances
docker compose up -d --scale firecrawl-server=3
```

### Tag and upload

`docker tag firecrawl-server-for-mcp-tools yourusername/firecrawl-server-for-mcp:latest`
`docker tag firecrawl-server-for-mcp-tools yourusername/firecrawl-server-for-mcp:0.0.1`
`docker push radu103/firecrawl-server-for-mcp:latest`
`docker push radu103/firecrawl-server-for-mcp:0.0.1`

### Docker Compose File

The project includes a `docker-compose.yml` file that configures:
- Port mapping (3000:3000)
- Environment variables
- Volume for persistent storage of downloaded files

## API Endpoints

- `GET /`: Home route that displays API information
- `POST /scrape`: Scrape a single URL
- `POST /scrape-batch`: Scrape multiple URLs
- `POST /crawl`: Crawl a website and scrape all pages

## Sample Requests

Check the `sample_requests` directory for HTTP request examples.

## Development

### Installation Without Docker

```bash
# Install dependencies
npm install

# Start server
npm start
```

The server runs on port 3000 by default or the port specified in the PORT environment variable.