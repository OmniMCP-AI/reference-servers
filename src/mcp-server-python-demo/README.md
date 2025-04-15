# MCP Server demo

This is a demo of an MCP server and it's intended to be tested in vscode.

Based on [Building a Basic MCP Server with Python by Alex Merced](https://www.dremio.com/blog/building-a-basic-mcp-server-with-python/)

## Development

Start a new [Devbox](https://www.jetify.com/docs/devbox/installing_devbox/?install-method=macos) shell that has your packages and tools installed:

```sh
devbox shell
```

## Testing it in vscode

### Requirements

- VSCode Version =>1.99.0

### Instructions

1. Open the environment in the devcontainer (vscode command palette > `Dev Containers: Reopen in Container`)
2. Run `task mix-server:run`
3. Open the command palette and select `MCP: List Servers`
4. Choose `mix_server`
5. Start it
6. Set Copilot to `Agent mode` by choosing "Agent" in the dropdown option next to the prompt textbox.
7. Ask Github copilot something like "Summarize the CSV file named sample.csv." or "How many rows are in sample.parquet?" Copilot will detect the appropriate tool, call the MCP server, and respond with the results—powered by the Python code.
