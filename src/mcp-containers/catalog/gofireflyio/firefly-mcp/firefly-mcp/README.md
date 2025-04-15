
# Firefly MCP Server

A containerized version of "Firefly MCP Server"

> Repository: [gofireflyio/firefly-mcp](https://github.com/gofireflyio/firefly-mcp)

## Description

The Firefly MCP (Model Context Protocol) server is a TypeScript-based server that enables seamless integration with the Firefly platform. It allows you to discover, manage, and codify resources across your Cloud and SaaS accounts connected to Firefly.


## Usage

The containers are built automatically and are available on the GitHub Container Registry.

1. Pull the Docker image:

```bash
docker pull ghcr.io/metorial/mcp-container--gofireflyio--firefly-mcp--firefly-mcp
```

2. Run the container:

```bash
docker run -it --rm ghcr.io/metorial/mcp-container--gofireflyio--firefly-mcp--firefly-mcp 
```

- `--rm` removes the container after it exits, so you don't have to clean up manually.
- `-it` allows you to interact with the container in your terminal.


### Configuration

The container supports the following configuration options:




#### Environment Variables

- `FIREFLY_ACCESS_KEY`
- `FIREFLY_SECRET_KEY`




## Usage with Claude

```json
{
  "mcpServers": {
    "firefly-mcp": {
      "command": "docker",
      "args": [
        "run",
        "-it",
        "--rm",
        "ghcr.io/metorial/mcp-container--gofireflyio--firefly-mcp--firefly-mcp"
      ],
      "env": {
        "FIREFLY_ACCESS_KEY": "firefly-access-key",
        "FIREFLY_SECRET_KEY": "firefly-secret-key"
      }
    }
  }
}
```

# License

Please refer to the license provided in [the project repository](https://github.com/gofireflyio/firefly-mcp) for more information.

## Contributing

Contributions are welcome! If you notice any issues or have suggestions for improvements, please open an issue or submit a pull request.

<div align="center">
  <sub>Containerized with ❤️ by <a href="https://metorial.com">Metorial</a></sub>
</div>
  