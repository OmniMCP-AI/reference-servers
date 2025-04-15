#!/usr/bin/env node

/**
 * This is an MCP server that interacts with the Enjin Platform API.
 * It allows:
 * - Creating new collections via a tool
 * - Getting collection data via a tool
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { GraphQLClient, gql } from 'graphql-request'; // Import GraphQL client and gql

// Enjin Platform API configuration
const API_ENDPOINT = process.env.ENJIN_API_ENDPOINT;
const API_KEY = process.env.ENJIN_API_KEY;

if (!API_ENDPOINT || !API_KEY) {
  console.error("Error: ENJIN_API_ENDPOINT and ENJIN_API_KEY environment variables must be set.");
  process.exit(1);
}

const client = new GraphQLClient(API_ENDPOINT, {
  headers: {
    'Authorization': API_KEY,
  },
});

// Define types for GraphQL responses
interface CreateCollectionResponse {
  CreateCollection: {
    id: string;
  };
}

interface GetCollectionResponse {
  GetCollection: {
    maxTokenCount: string | null;
    maxTokenSupply: string | null;
    forceCollapsingSupply: boolean | null;
    frozen: boolean | null;
    royalty: {
      beneficiary: {
        account: {
          address: string;
        };
      };
      percentage: number | null;
    } | null;
    totalDeposit: string | null;
    totalInfusion: string | null;
    creationDeposit: {
      amount: string | null;
    } | null;
    owner: {
      account: {
        publicKey: string;
      };
    } | null;
    attributes: {
      key: string;
      value: string;
    }[] | null;
    tokens: {
      totalCount: string | null;
    } | null;
  } | null;
}

/**
 * Create an MCP server with capabilities for interacting with the Enjin Platform API.
 */
const server = new Server(
  {
    name: "Enjin-Platform-Tool",
    version: "0.1.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
      prompts: {},
    },
  }
);

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "create_collection",
        description: "Create a new NFT collection on the Enjin Platform",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of the collection",
            },
            description: {
              type: "string",
              description: "Description of the collection",
            },
            media: {
              type: "string",
              description: "URL of the collection media",
            },
          },
          required: ["name", "description", "media"],
        },
      },
      {
        name: "get_collection",
        description: "Get a collection from the Enjin Platform",
        inputSchema: {
          type: "object",
          properties: {
            collection_id: {
              type: "string",
              description: "ID of the collection",
            },
          },
          required: ["collection_id"],
        },
      },
    ],
  };
});

/**
 * Handler for the create_collection tool.
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  switch (request.params.name) {
    case "create_collection": {
      const name = String(request.params.arguments?.name);
      const description = String(request.params.arguments?.description);
      const media = String(request.params.arguments?.media);

      if (!name || !description || !media) {
        throw new Error("Name, description, and media are required");
      }

      const mutation = gql`
        mutation CreateCollection(
          $name: String!
          $description: String!
          $media: String!
        ){
          CreateCollection(
            attributes:[
              {
                key: "name", value: $name
              },
              {
                key: "description", value: $description
              },
              {
                key: "media", value: $media
              }
            ]
          ){
            id
          }
        }
      `;

      try {
        const data: CreateCollectionResponse = await client.request(mutation, { name, description, media });
        const collectionId = data.CreateCollection.id;
        return {
          content: [
            {
              type: "text",
              text: `Created collection with ID: ${collectionId}`,
            },
          ],
        };
      } catch (error: any) {
        console.error("Error creating collection:", error);
        return {
          content: [
            {
              type: "text",
              text: `Error creating collection: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    }
    case "get_collection": {
      const collectionId = String(request.params.arguments?.collection_id);

      if (!collectionId) {
        throw new Error("collection_id is required");
      }

      const query = gql`
        query GetCollection(
          $collection_id: BigInt!
        ){
          GetCollection(collectionId: $collection_id){
            maxTokenCount
            maxTokenSupply
            forceCollapsingSupply
            frozen
            royalty{
              beneficiary{
                account{
                  address
                }
              }
              percentage
            }
            totalDeposit
            totalInfusion
            creationDeposit{
              amount
            }
            owner{
              account{
                publicKey
              }
            }
            attributes{
              key
              value
            }
            tokens{
              totalCount
            }
          }
        }
      `;

      try {
        const data: GetCollectionResponse = await client.request(query, { collection_id: collectionId });
        const collectionData = JSON.stringify(data.GetCollection, null, 2);
        return {
          content: [
            {
              type: "text",
              text: `Collection data:\n${collectionData}`,
            },
          ],
        };
      } catch (error: any) {
        console.error("Error getting collection:", error);
        return {
          content: [
            {
              type: "text",
              text: `Error getting collection: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    }
    default:
      throw new Error("Unknown tool");
  }
});

/**
 * Start the server using stdio transport.
 * This allows the server to communicate via standard input/output streams.
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
