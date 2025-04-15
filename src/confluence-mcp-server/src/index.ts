#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { ConfluenceClient } from "./confluence-client.js";

const server = new McpServer({
  name: "confluence-mcp-server",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

async function main() {
  const transport = new StdioServerTransport();

  const confluenceClient = new ConfluenceClient({
    confluenceUrl: process.env.CONFLUENCE_URL || "",
    email: process.env.CONFLUENCE_EMAIL || "",
    apiToken: process.env.ATLASSIAN_API_TOKEN || "",
  });

  server.tool(
    "confluence-get-pages-in-space",
    "Confluenceのスペース内のページを取得します",
    {
      spaceId: z.string().describe("スペースID"),
      title: z.string().describe("検索するページのタイトル").optional(),
    },
    async ({ spaceId, title }) => {
      const data = await confluenceClient.getPagesInSpace(spaceId, {
        title,
      });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data?.map(page => ({
              id: page.id,
              title: page.title,
            }))),
          }
        ]
      }
    }
  )

  server.tool(
    "confluence-get-spaces",
    "Confluenceのスペースを取得します",
    {
      spaceKeys: z.string().array().describe("スペースキー").optional(),
    },
    async ({ spaceKeys }) => {
      const data = await confluenceClient.getSpaces({
        spaceKeys
      });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data),
          }
        ]
      }
    }
  )

  server.tool(
    "confluence-get-page",
    "Confluenceのページを取得します",
    {
      pageId: z.string().describe("ページID"),
    },
    async ({ pageId }) => {
      const text = await confluenceClient.getPage(pageId);
      return {
        content: [
          {
            type: "text",
            text,
          }
        ]
      }
    }
  )

  server.tool(
    "confluence-get-pages",
    "Confluenceのページを取得します",
    async () => {
      const data = await confluenceClient.getPages();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data?.map(page => ({
              id: page.id,
              title: page.title,
            }))),
          }
        ]
      }
    })

  server.tool(
    "confluence-create-page",
    "Confluenceのページを作成します",
    {
      title: z.string().describe("ページタイトル"),
      content: z.string().describe("ページ内容"),
      parentId: z.string().describe("親ページID"),
      spaceId: z.string().describe("スペースID"),
    },
    async ({ title, content, parentId, spaceId }) => {
      const data = await confluenceClient.createPage({ title, content, parentId, spaceId });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data),
          }
        ]
      }
    }
  )

  server.connect(transport);
  console.error("confluence-mcp-server started");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
