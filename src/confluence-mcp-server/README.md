## Confluence MCP Server Sample

このリポジトリは、Model Context Protocol (MCP) サーバーのサンプル実装です。
Confluence APIを使用して、Confluenceのページを取得/作成するMCPサーバーを実装しています。

## Setup

```bash
npm install
```

## Build

```bash
npm run build
# or
npm run watch
```

## Generate client code from OpenAPI spec

```bash
npm run generate:client
```

## Debug

ビルド後は絶対パスでスクリプトを指定して、実行できます。

Claude Desktopの例:
```json
{
  "mcpServers": {
    "confluence-mcp-server": {
      "command": "/path/to/confluence-mcp-server/dist/index.js",
      "env": {
        "ATLASSIAN_API_TOKEN": "<YOUR_API_TOKEN>",
        "CONFLUENCE_URL": "https://<YOUR_DOMANIN>.atlassian.net/wiki/api/v2",
        "CONFLUENCE_EMAIL": "<YOUR_EMAIL>",
      }
    }
  }
}
```
