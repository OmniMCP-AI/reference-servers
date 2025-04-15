# JSONPlaceholder MCP Server

A Model Context Protocol (MCP) server implementation that provides tools to interact with the JSONPlaceholder API and basic calculator functions.

## Features

- **Calculator Server**: Provides basic arithmetic operations (add, subtract)
- **JSONPlaceholder Server**: Provides access to the JSONPlaceholder API data:
  - Users
  - Posts
  - Comments
  - Albums
  - Todos

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or later for native fetch support)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Running the Servers

You can run the servers using npm scripts:

```bash
# Run the JSONPlaceholder server (default)
npm start

# Run the Calculator server
npm run start:calculator

# Run the JSONPlaceholder server explicitly
npm run start:jsonplaceholder
```

## VS Code Integration

This project includes configuration for VS Code integration. The MCP servers can be accessed through VS Code settings:

1. In the `.vscode/mcp.json` file:

```json
{
  "servers": {
    "my-calc": {
      "command": "node",
      "args": ["/path/to/servers/calculator.js"]
    },
    "my-mcp-server": {
      "command": "node",
      "args": ["/path/to/servers/jsonplaceholder.js"]
    }
  }
}
```

2. Or in your VS Code settings.json:

```json
"mcp": {
  "servers": {
    "my-calc": {
      "command": "node",
      "args": [
        "/path/to/servers/calculator.js"
      ]
    },
    "my-mcp-server": {
      "command": "node",
      "args": [
        "/path/to/servers/jsonplaceholder.js"
      ]
    }
  }
}
```
