
# Goat SDK Model Context Protocol

A containerized version of "Goat SDK Model Context Protocol"

> Repository: [goat-sdk/goat](https://github.com/goat-sdk/goat)

## Description

The leading agentic finance toolkit for AI agents


## Usage

The containers are built automatically and are available on the GitHub Container Registry.

1. Pull the Docker image:

```bash
docker pull ghcr.io/metorial/mcp-container--goat-sdk--goat--model-context-protocol
```

2. Run the container:

```bash
docker run -it --rm ghcr.io/metorial/mcp-container--goat-sdk--goat--model-context-protocol 
```

- `--rm` removes the container after it exits, so you don't have to clean up manually.
- `-it` allows you to interact with the container in your terminal.


### Configuration

The container supports the following configuration options:




#### Environment Variables

- `WALLET_PRIVATE_KEY`
- `RPC_PROVIDER_URL`




## Usage with Claude

```json
{
  "mcpServers": {
    "model-context-protocol": {
      "command": "docker",
      "args": [
        "run",
        "-it",
        "--rm",
        "ghcr.io/metorial/mcp-container--goat-sdk--goat--model-context-protocol"
      ],
      "env": {
        "WALLET_PRIVATE_KEY": "wallet-private-key",
        "RPC_PROVIDER_URL": "rpc-provider-url"
      }
    }
  }
}
```

# License

Please refer to the license provided in [the project repository](https://github.com/goat-sdk/goat) for more information.

## Contributing

Contributions are welcome! If you notice any issues or have suggestions for improvements, please open an issue or submit a pull request.

<div align="center">
  <sub>Containerized with ❤️ by <a href="https://metorial.com">Metorial</a></sub>
</div>
  