# Mcp Server Basic Sample

## Prepare mcp server app

### 1. Install packages

```bash
pnpm install
```

### 2. Build

```bash
pnpm build
```

## Mcp Inspector

[Inspector - Model Context Protocol](https://modelcontextprotocol.io/docs/tools/inspector)

```bash
pnpm start
```

```bash
pnpm inspect
```

## Claude for Desktop

### Download Claude for Desktop

[Download - Claude](https://claude.ai/download)

### Set Configure Claude for Desktop

Open the config file in VSCode.

```bash
code ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

/Users/[user]/Library/Application Support/Claude/claude_desktop_config.json

```json
{
  "mcpServers": {
    "RandomNumber": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/PARENT/FOLDER/build/index.js"]
    }
  }
}
```

If you use [mise](https://mise.jdx.dev/).

```bash
$ mise which node
/Users/[user]/.local/share/mise/installs/node/22.14.0/bin/node
```

/Users/[user]/Library/Application Support/Claude/claude_desktop_config.json

```json
{
  "mcpServers": {
    "RandomNumber": {
      "command": "/Users/[user]/.local/share/mise/installs/node/22.14.0/bin/node",
      "args": ["/ABSOLUTE/PATH/TO/PARENT/FOLDER/build/index.js"]
    }
  }
}
```

reference: https://github.com/modelcontextprotocol/servers/issues/64#issuecomment-2503152420

## Resources

- [Example Servers - Model Context Protocol](https://modelcontextprotocol.io/examples)
- [modelcontextprotocol/typescript-sdk: The official Typescript SDK for Model Context Protocol servers and clients](https://github.com/modelcontextprotocol/typescript-sdk/tree/main)
- [TypeScript で MCP サーバーを実装し、Claude Desktop から利用する](https://azukiazusa.dev/blog/typescript-mcp-server/)
- [簡易な自作MCPサーバーをお試しで実装する方法](https://zenn.dev/smartround_dev/articles/02af1058e9f80f)
