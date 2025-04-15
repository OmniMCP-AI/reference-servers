import { describe, it, expect } from 'vitest';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { server } from './index.js';

describe('RandomNumber', () => {
  it('ランダムな値を返す', async () => {
    // テスト用クライアントの作成
    const client = new Client({
      name: 'test client',
      version: '0.1.0',
    });

    // インメモリ通信チャネルの作成
    const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

    // クライアントとサーバーを接続
    await Promise.all([client.connect(clientTransport), server.connect(serverTransport)]);

    // クライアントからツールを呼び出す
    const result = await client.callTool({
      name: 'randomNumber',
      arguments: {
        max: 100,
      },
    });

    expect(result).toEqual({
      content: [
        {
          type: 'text',
          text: expect.stringMatching(/^[1-9]|[1-9][0-9]$/),
        },
      ],
    });
  });
});
