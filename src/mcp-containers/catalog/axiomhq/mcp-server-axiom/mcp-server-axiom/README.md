
# mcp-server-axiom

A containerized version of "mcp-server-axiom"

> Repository: [axiomhq/mcp-server-axiom](https://github.com/axiomhq/mcp-server-axiom)

## Description

A [Model Context Protocol](https://modelcontextprotocol.io/) server implementation for [Axiom](https://axiom.co) that enables AI agents to query your data using Axiom Processing Language (APL).


## Usage

The containers are built automatically and are available on the GitHub Container Registry.

1. Pull the Docker image:

```bash
docker pull ghcr.io/metorial/mcp-container--axiomhq--mcp-server-axiom--mcp-server-axiom
```

2. Run the container:

```bash
docker run -it --rm ghcr.io/metorial/mcp-container--axiomhq--mcp-server-axiom--mcp-server-axiom 
```

- `--rm` removes the container after it exits, so you don't have to clean up manually.
- `-it` allows you to interact with the container in your terminal.


### Configuration

The container supports the following configuration options:




#### Environment Variables

- `AXIOM_TOKEN`
- `AXIOM_URL`
- `AXIOM_ORG_ID`
- `AXIOM_QUERY_RATE`
- `AXIOM_QUERY_BURST`
- `AXIOM_DATASETS_RATE`
- `AXIOM_DATASETS_BURST`




## Usage with Claude

```json
{
  "mcpServers": {
    "mcp-server-axiom": {
      "command": "docker",
      "args": [
        "run",
        "-it",
        "--rm",
        "ghcr.io/metorial/mcp-container--axiomhq--mcp-server-axiom--mcp-server-axiom"
      ],
      "env": {
        "AXIOM_TOKEN": "axiom-token",
        "AXIOM_URL": "axiom-url",
        "AXIOM_ORG_ID": "axiom-org-id",
        "AXIOM_QUERY_RATE": "axiom-query-rate",
        "AXIOM_QUERY_BURST": "axiom-query-burst",
        "AXIOM_DATASETS_RATE": "axiom-datasets-rate",
        "AXIOM_DATASETS_BURST": "axiom-datasets-burst"
      }
    }
  }
}
```

# License

Please refer to the license provided in [the project repository](https://github.com/axiomhq/mcp-server-axiom) for more information.

## Contributing

Contributions are welcome! If you notice any issues or have suggestions for improvements, please open an issue or submit a pull request.

<div align="center">
  <sub>Containerized with ❤️ by <a href="https://metorial.com">Metorial</a></sub>
</div>
  