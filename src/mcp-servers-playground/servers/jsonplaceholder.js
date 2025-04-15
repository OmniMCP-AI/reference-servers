import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Base URL for JSONPlaceholder API
const BASE_URL = "https://jsonplaceholder.typicode.com";

// Create new MCP server
const server = new McpServer({
  name: "JSONPlaceholder MCP Server",
  version: "1.0.0",
  description: "MCP Server for accessing JSONPlaceholder API data",
});

// Helper function to fetch data from the API
async function fetchFromApi(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
}

// Get all users
server.tool(
  "getUsers",
  "Get all users from JSONPlaceholder",
  {},
  async () => {
    const users = await fetchFromApi("/users");
    return {
      content: [
        { 
          type: "text", 
          text: JSON.stringify(users, null, 2)
        }
      ],
    };
  }
);

// Get a specific user by ID
server.tool(
  "getUserById",
  "Get a specific user by ID",
  { id: z.number().positive().int() },
  async ({ id }) => {
    const user = await fetchFromApi(`/users/${id}`);
    return {
      content: [
        { 
          type: "text", 
          text: JSON.stringify(user, null, 2)
        }
      ],
    };
  }
);

// Get all posts
server.tool(
  "getPosts",
  "Get all posts from JSONPlaceholder",
  {},
  async () => {
    const posts = await fetchFromApi("/posts");
    return {
      content: [
        { 
          type: "text", 
          text: JSON.stringify(posts, null, 2)
        }
      ],
    };
  }
);

// Get posts by user ID
server.tool(
  "getPostsByUser",
  "Get all posts from a specific user",
  { userId: z.number().positive().int() },
  async ({ userId }) => {
    const posts = await fetchFromApi(`/posts?userId=${userId}`);
    return {
      content: [
        { 
          type: "text", 
          text: JSON.stringify(posts, null, 2)
        }
      ],
    };
  }
);

// Get all comments
server.tool(
  "getComments",
  "Get all comments from JSONPlaceholder",
  {},
  async () => {
    const comments = await fetchFromApi("/comments");
    return {
      content: [
        { 
          type: "text", 
          text: JSON.stringify(comments, null, 2)
        }
      ],
    };
  }
);

// Get comments for a specific post
server.tool(
  "getCommentsByPost",
  "Get all comments for a specific post",
  { postId: z.number().positive().int() },
  async ({ postId }) => {
    const comments = await fetchFromApi(`/comments?postId=${postId}`);
    return {
      content: [
        { 
          type: "text", 
          text: JSON.stringify(comments, null, 2)
        }
      ],
    };
  }
);

// Get all albums
server.tool(
  "getAlbums",
  "Get all albums from JSONPlaceholder",
  {},
  async () => {
    const albums = await fetchFromApi("/albums");
    return {
      content: [
        { 
          type: "text", 
          text: JSON.stringify(albums, null, 2)
        }
      ],
    };
  }
);

// Get albums by user ID
server.tool(
  "getAlbumsByUser",
  "Get all albums from a specific user",
  { userId: z.number().positive().int() },
  async ({ userId }) => {
    const albums = await fetchFromApi(`/albums?userId=${userId}`);
    return {
      content: [
        { 
          type: "text", 
          text: JSON.stringify(albums, null, 2)
        }
      ],
    };
  }
);

// Get all todos
server.tool(
  "getTodos",
  "Get all todos from JSONPlaceholder",
  {},
  async () => {
    const todos = await fetchFromApi("/todos");
    return {
      content: [
        { 
          type: "text", 
          text: JSON.stringify(todos, null, 2)
        }
      ],
    };
  }
);

// Get todos by user ID
server.tool(
  "getTodosByUser",
  "Get all todos for a specific user",
  { userId: z.number().positive().int() },
  async ({ userId }) => {
    const todos = await fetchFromApi(`/todos?userId=${userId}`);
    return {
      content: [
        { 
          type: "text", 
          text: JSON.stringify(todos, null, 2)
        }
      ],
    };
  }
);

// Connect to transport and start the server
const transport = new StdioServerTransport();
await server.connect(transport);

console.log("JSONPlaceholder MCP Server started and connected to transport");
