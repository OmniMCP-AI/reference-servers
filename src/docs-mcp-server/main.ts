import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SearchTool } from "./tools/search-tool.ts";
import { GetTool } from "./tools/get-tool.ts";

// Arguments
const basePath = Deno.args[0];
const searchContentLines = Deno.args[1] ? parseInt(Deno.args[1]) : 25;

// MCP Server
const server: McpServer = new McpServer({
  name: "Docs MCP Server",
  version: "1.0.0",
});

// Tools
const searchTool = new SearchTool(basePath, searchContentLines);
searchTool.addToServer(server);

const getTool = new GetTool(basePath);
getTool.addToServer(server);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
