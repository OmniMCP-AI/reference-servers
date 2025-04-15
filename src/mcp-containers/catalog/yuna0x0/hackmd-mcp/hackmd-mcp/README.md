
# HackMD MCP Server

A containerized version of "HackMD MCP Server"

> Repository: [yuna0x0/hackmd-mcp](https://github.com/yuna0x0/hackmd-mcp)

## Description

This is a Model Context Protocol (MCP) server for interacting with the [HackMD API](https://hackmd.io/@hackmd-api/developer-portal). It allows AI assistants to perform operations such as:


## Usage

The containers are built automatically and are available on the GitHub Container Registry.

1. Pull the Docker image:

```bash
docker pull ghcr.io/metorial/mcp-container--yuna0x0--hackmd-mcp--hackmd-mcp
```

2. Run the container:

```bash
docker run -it --rm ghcr.io/metorial/mcp-container--yuna0x0--hackmd-mcp--hackmd-mcp 
```

- `--rm` removes the container after it exits, so you don't have to clean up manually.
- `-it` allows you to interact with the container in your terminal.


### Configuration

The container supports the following configuration options:




#### Environment Variables

- `HACKMD_API_TOKEN`




## Usage with Claude

```json
{
  "mcpServers": {
    "hackmd-mcp": {
      "command": "docker",
      "args": [
        "run",
        "-it",
        "--rm",
        "ghcr.io/metorial/mcp-container--yuna0x0--hackmd-mcp--hackmd-mcp"
      ],
      "env": {
        "HACKMD_API_TOKEN": "hackmd-api-token"
      }
    }
  }
}
```

# License

Please refer to the license provided in [the project repository](https://github.com/yuna0x0/hackmd-mcp) for more information.

## Contributing

Contributions are welcome! If you notice any issues or have suggestions for improvements, please open an issue or submit a pull request.

<div align="center">
  <sub>Containerized with ❤️ by <a href="https://metorial.com">Metorial</a></sub>
</div>
  