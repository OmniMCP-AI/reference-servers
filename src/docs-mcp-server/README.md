# Docs MCP Server

Search and read your documentation in markdown or text files using the model
context protocol.

> [!NOTE]
> Requires Deno to be installed.

## Demo

![Demo](https://github.com/user-attachments/assets/01724c85-d26d-4107-86fd-b419d520e926)

## Usage

Add the following block to your MCP client:

```json
"mcp": {
  "servers": {
    "docs-mcp-server": {
      "type": "stdio",
      "command": "deno",
      "args": ["run", "--allow-read", "jsr:@miguelripoll23/docs-mcp-server", "DIRECTORY_PATH_DOCUMENTATION_HERE"]
    }
  }
}
```
