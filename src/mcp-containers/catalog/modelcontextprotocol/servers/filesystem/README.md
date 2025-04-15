
# Filesystem MCP Server

A containerized version of "Filesystem MCP Server"

> Repository: [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)

## Description

Node.js server implementing Model Context Protocol (MCP) for filesystem operations.


## Usage

The containers are built automatically and are available on the GitHub Container Registry.

1. Pull the Docker image:

```bash
docker pull ghcr.io/metorial/mcp-container--modelcontextprotocol--servers--filesystem
```

2. Run the container:

```bash
docker run -it --rm ghcr.io/metorial/mcp-container--modelcontextprotocol--servers--filesystem {{DIR}}
```

- `--rm` removes the container after it exits, so you don't have to clean up manually.
- `-it` allows you to interact with the container in your terminal.


### Configuration

The container supports the following configuration options:


#### Arguments

- `{{DIR}}`






## Usage with Claude

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "docker",
      "args": [
        "run",
        "-it",
        "--rm",
        "ghcr.io/metorial/mcp-container--modelcontextprotocol--servers--filesystem",
        "{{DIR}}"
      ],
      "env": {}
    }
  }
}
```

# License

Please refer to the license provided in [the project repository](https://github.com/modelcontextprotocol/servers) for more information.

## Contributing

Contributions are welcome! If you notice any issues or have suggestions for improvements, please open an issue or submit a pull request.

<div align="center">
  <sub>Containerized with ❤️ by <a href="https://metorial.com">Metorial</a></sub>
</div>
  