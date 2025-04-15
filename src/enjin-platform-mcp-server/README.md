# Enjin API Tool MCP Server

This MCP server enables interaction with the Enjin Platform API.

## Prerequisites

- Node.js (v16 or higher)
- Any MCP-supported IDE
- Enjin Platform API Key

## Setup Instructions

### 1. Get an Enjin Platform API Key

- Create an account on the Enjin Platform.
- Generate an API key.

### 2. Initial Project Setup

Install dependencies:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file for local development (don't commit this file), or define the environement variables in your IDE's mcp server configuration.

Example:

```plaintext
ENJIN_API_ENDPOINT=https://platform.canary.enjin.io/graphql
ENJIN_API_KEY=your-enjin-api-key
```

### 4. Configure Your MCP-supported IDE

Follow the instructions for your specific IDE to configure the MCP server. This typically involves:

1.  Adding a new server configuration.
2.  Specifying the command to run the server (e.g., `node build/index.js`).
3.  Setting the environment variables (e.g., `ENJIN_API_KEY`).

Consult your IDE's documentation for detailed instructions.

## Available Tools

The server currently provides the following tools:

### create_collection

Creates a new NFT collection on the Enjin Platform. Requires the following parameters:

-   `name`: (string) The name of the collection.
-   `description`: (string) A description of the collection.
-   `media`: (string) URL of the collection media.

### get_collection

Retrieves a collection from the Enjin Platform. Requires the following parameter:

-   `collection_id`: (string) The ID of the collection.

## Type Definitions

```typescript
// Example type definitions - adjust based on your API responses
interface EnjinApiError {
    status?: number;
    message: string;
    code?: string;
}

interface Collection {
    id: string;
    name: string;
    description: string;
    media: string;
    // ... other collection properties
}
```

## Error Handling

The server handles various error scenarios:

### Environment Errors

-   Missing `ENJIN_API_KEY`
-   Invalid API key

### API Errors

-   Rate limiting
-   Invalid request parameters
-   Internal server errors

## Troubleshooting

### Common Issues

#### Tools not appearing in IDE

-   Check IDE logs
-   Verify `ENJIN_API_KEY` is set correctly
-   Ensure the server is running

#### Authentication Errors

-   Verify your API key is valid
-   Check if the key has the necessary permissions

### Viewing Logs

To view server logs, consult your IDE's documentation on how to view logs for MCP servers.

### Environment Variables

If you're getting environment variable errors, verify:

-   `ENJIN_API_ENDPOINT`: Should be a valid Enjin Platform API endpoint
-   `ENJIN_API_KEY`: Should be a valid Enjin Platform API key

## Security Considerations

-   Keep your API key secure
-   Don't commit credentials to version control
-   Use environment variables for sensitive data
-   Regularly rotate API keys
-   Monitor API usage in the Enjin Platform