
# Flightradar24 MCP Server 🛩️

A containerized version of "Flightradar24 MCP Server 🛩️"

> Repository: [sunsetcoder/flightradar24-mcp-server](https://github.com/sunsetcoder/flightradar24-mcp-server)

## Description

A Claude Desktop MCP server that helps you track flights in real-time using Flightradar24 data. Perfect for aviation enthusiasts, travel planners, or anyone curious about flights overhead!


## Usage

The containers are built automatically and are available on the GitHub Container Registry.

1. Pull the Docker image:

```bash
docker pull ghcr.io/metorial/mcp-container--sunsetcoder--flightradar24-mcp-server--flightradar-24-mcp-server
```

2. Run the container:

```bash
docker run -it --rm ghcr.io/metorial/mcp-container--sunsetcoder--flightradar24-mcp-server--flightradar-24-mcp-server 
```

- `--rm` removes the container after it exits, so you don't have to clean up manually.
- `-it` allows you to interact with the container in your terminal.


### Configuration

The container supports the following configuration options:




#### Environment Variables

- `FR24_API_KEY`
- `FR24_API_URL`




## Usage with Claude

```json
{
  "mcpServers": {
    "flightradar-24-mcp-server": {
      "command": "docker",
      "args": [
        "run",
        "-it",
        "--rm",
        "ghcr.io/metorial/mcp-container--sunsetcoder--flightradar24-mcp-server--flightradar-24-mcp-server"
      ],
      "env": {
        "FR24_API_KEY": "fr-24-api-key",
        "FR24_API_URL": "fr-24-api-url"
      }
    }
  }
}
```

# License

Please refer to the license provided in [the project repository](https://github.com/sunsetcoder/flightradar24-mcp-server) for more information.

## Contributing

Contributions are welcome! If you notice any issues or have suggestions for improvements, please open an issue or submit a pull request.

<div align="center">
  <sub>Containerized with ❤️ by <a href="https://metorial.com">Metorial</a></sub>
</div>
  