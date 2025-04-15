
# Octagon: MCP For Market Data

A containerized version of "Octagon: MCP For Market Data"

> Repository: [OctagonAI/octagon-mcp-server](https://github.com/OctagonAI/octagon-mcp-server)

## Description

A free Model Context Protocol (MCP) server that integrates with Octagon Market Intelligence API


## Usage

The containers are built automatically and are available on the GitHub Container Registry.

1. Pull the Docker image:

```bash
docker pull ghcr.io/metorial/mcp-container--octagonai--octagon-mcp-server--octagon-mcp-server
```

2. Run the container:

```bash
docker run -it --rm ghcr.io/metorial/mcp-container--octagonai--octagon-mcp-server--octagon-mcp-server 
```

- `--rm` removes the container after it exits, so you don't have to clean up manually.
- `-it` allows you to interact with the container in your terminal.


### Configuration

The container supports the following configuration options:




#### Environment Variables

- `OCTAGON_API_KEY`




## Usage with Claude

```json
{
  "mcpServers": {
    "octagon-mcp-server": {
      "command": "docker",
      "args": [
        "run",
        "-it",
        "--rm",
        "ghcr.io/metorial/mcp-container--octagonai--octagon-mcp-server--octagon-mcp-server"
      ],
      "env": {
        "OCTAGON_API_KEY": "octagon-api-key"
      }
    }
  }
}
```

# License

Please refer to the license provided in [the project repository](https://github.com/OctagonAI/octagon-mcp-server) for more information.

## Contributing

Contributions are welcome! If you notice any issues or have suggestions for improvements, please open an issue or submit a pull request.

<div align="center">
  <sub>Containerized with ❤️ by <a href="https://metorial.com">Metorial</a></sub>
</div>
  