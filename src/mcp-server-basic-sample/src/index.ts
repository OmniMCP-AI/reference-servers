import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// サーバーインスタンスの作成
export const server = new McpServer({
  name: 'MyMcpServer',
  version: '0.1.0',
});

server.tool(
  'randomNumber', // ツールの名前
  'get a random number', // ツールの説明
  // ツールの引数を定義するスキーマ
  {
    max: z.number().min(1).max(100).describe('Maximum number of random numbers'),
  },
  // ツールが呼び出されたときに実行される関数
  async ({ max }) => {
    const random = Math.floor(Math.random() * max) + 1;

    return {
      content: [
        {
          type: 'text',
          text: random.toString(),
        },
      ],
    };
  }
);

server.tool('add', 'Add an addition tool', { a: z.number(), b: z.number() }, async ({ a, b }) => ({
  content: [{ type: 'text', text: String(a + b) }],
}));

// Static resource
server.resource('config', 'config://app', async (uri) => ({
  contents: [
    {
      uri: uri.href,
      text: 'App configuration here',
    },
  ],
}));

// Add a dynamic greeting resource
server.resource('greeting', new ResourceTemplate('greeting://{name}', { list: undefined }), async (uri, { name }) => ({
  contents: [
    {
      uri: uri.href,
      text: `Hello, ${name}!`,
    },
  ],
}));

// Dynamic resource with parameters
server.resource(
  'user-profile',
  new ResourceTemplate('users://{userId}/profile', { list: undefined }),
  async (uri, { userId }) => ({
    contents: [
      {
        uri: uri.href,
        text: `Profile data for user ${userId}`,
      },
    ],
  })
);

server.prompt('review-code', { code: z.string() }, ({ code }) => ({
  messages: [
    {
      role: 'user',
      content: {
        type: 'text',
        text: `Please review this code:\n\n${code}`,
      },
    },
  ],
}));

async function main() {
  const transport = new StdioServerTransport();

  await server.connect(transport);
  console.error('MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
