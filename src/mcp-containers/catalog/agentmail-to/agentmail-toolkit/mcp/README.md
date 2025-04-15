
# ## AgentMail MCP Integration

A containerized version of "## AgentMail MCP Integration"

> Repository: [agentmail-to/agentmail-toolkit](https://github.com/agentmail-to/agentmail-toolkit)

## Description

A simple **Model Context Protocol (MCP)** server that integrates with [AgentMail](https://agentmail.to) to dynamically manage email inboxes, list messages, and send or reply to emails—all through an AI assistant such as Claude. This reference implementation demonstrates how to use AgentMail’s API within an MCP server to orchestrate email inboxes on the fly.


## Usage

The containers are built automatically and are available on the GitHub Container Registry.

1. Pull the Docker image:

```bash
docker pull ghcr.io/metorial/mcp-container--agentmail-to--agentmail-toolkit--mcp
```

2. Run the container:

```bash
docker run -it --rm ghcr.io/metorial/mcp-container--agentmail-to--agentmail-toolkit--mcp 
```

- `--rm` removes the container after it exits, so you don't have to clean up manually.
- `-it` allows you to interact with the container in your terminal.


### Configuration

The container supports the following configuration options:


#### Arguments

- `--api-key`



#### Environment Variables

- `YOUR_AGENTMAIL_API_KEY`
- `AGENT_MAIL_API_KEY`




## Usage with Claude

```json
{
  "mcpServers": {
    "mcp": {
      "command": "docker",
      "args": [
        "run",
        "-it",
        "--rm",
        "ghcr.io/metorial/mcp-container--agentmail-to--agentmail-toolkit--mcp",
        "--api-key your-agentmail-api-key"
      ],
      "env": {
        "YOUR_AGENTMAIL_API_KEY": "your-agentmail-api-key",
        "AGENT_MAIL_API_KEY": "agent-mail-api-key"
      }
    }
  }
}
```

# License

Please refer to the license provided in [the project repository](https://github.com/agentmail-to/agentmail-toolkit) for more information.

## Contributing

Contributions are welcome! If you notice any issues or have suggestions for improvements, please open an issue or submit a pull request.

<div align="center">
  <sub>Containerized with ❤️ by <a href="https://metorial.com">Metorial</a></sub>
</div>
  