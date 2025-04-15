
# Anki MCP Server

A containerized version of "Anki MCP Server"

> Repository: [scorzeth/anki-mcp-server](https://github.com/scorzeth/anki-mcp-server)

## Description

An MCP server implementation that connects to a locally running Anki, providing card review and creation.


## Usage

The containers are built automatically and are available on the GitHub Container Registry.

1. Pull the Docker image:

```bash
docker pull ghcr.io/metorial/mcp-container--scorzeth--anki-mcp-server--anki-mcp-server
```

2. Run the container:

```bash
docker run -it --rm ghcr.io/metorial/mcp-container--scorzeth--anki-mcp-server--anki-mcp-server 
```

- `--rm` removes the container after it exits, so you don't have to clean up manually.
- `-it` allows you to interact with the container in your terminal.



## Usage with Claude

```json
{
  "mcpServers": {
    "anki-mcp-server": {
      "command": "docker",
      "args": [
        "run",
        "-it",
        "--rm",
        "ghcr.io/metorial/mcp-container--scorzeth--anki-mcp-server--anki-mcp-server"
      ],
      "env": {}
    }
  }
}
```

# License

Please refer to the license provided in [the project repository](https://github.com/scorzeth/anki-mcp-server) for more information.

## Contributing

Contributions are welcome! If you notice any issues or have suggestions for improvements, please open an issue or submit a pull request.

<div align="center">
  <sub>Containerized with ❤️ by <a href="https://metorial.com">Metorial</a></sub>
</div>
  