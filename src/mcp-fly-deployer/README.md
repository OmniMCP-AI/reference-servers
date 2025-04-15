# MCP Fly Deployer

A specialized configuration generator for deploying Model Context Protocol (MCP) servers to Fly.io. This tool automates the creation of Dockerfiles, fly.toml configurations, and deployment scripts for stdio-based MCP servers.

This project integrates [supergateway](https://github.com/supercorp-ai/supergateway) to enable MCP stdio servers to communicate over SSE (Server-Sent Events) or WebSockets, facilitating seamless deployment to Fly.io's infrastructure.

## Features

- 🚀 Automated Fly.io deployment configuration generation
- 🐳 Dynamic Dockerfile generation based on runtime
- ⚙️ Customizable `fly.toml` configuration
- 🔧 Support for multiple runtimes:
  - Python
  - Node.js
  - Go
  - Custom binary
- 🔑 Environment variables and secrets management
- 🌐 Configurable regions and deployment options

## How It Works

The MCP Fly Deployer uses supergateway to:
- Convert stdio-based MCP servers into SSE or WebSocket services
- Enable remote access and debugging capabilities
- Manage JSON-RPC versioning automatically
- Handle package metadata transmission

For more details about the underlying gateway technology, see the [supergateway documentation](https://github.com/supercorp-ai/supergateway).

## Prerequisites

- Python 3.13 or higher
- pip (Python package manager)
- [Fly.io CLI](https://fly.io/docs/hands-on/install-flyctl/) installed and configured
- [Node.js and npm](https://nodejs.org/) (for supergateway functionality)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mcp-fly-deployer.git
cd mcp-fly-deployer
```

2. Create and activate a virtual environment:
```bash
python -m venv .venv
source .venv/bin/activate  # On Unix/macOS
# OR
.venv\Scripts\activate     # On Windows
```

3. Install dependencies:
```bash
uv sync
```

## Usage

1. Start the MCP server:
```bash
python mcp_server_generator.py
```

The server will start on port 8000 by default, using SSE (Server-Sent Events) transport.

2. Send requests to generate deployment plans with the following parameters:

```python
{
    "server_command": "node",              # Command to run the target stdio server
    "server_args": ["index.js"],           # Arguments for the server command
    "runtime": "node",                     # Runtime ('python', 'node', 'go', 'binary')
    "runtime_version": "20",               # Specific runtime version
    "dependencies": [],                    # List of dependencies
    "requirements_file_content": None,     # Content of requirements.txt for Python
    "files_to_create": [],                # Files to create in the image
    "required_env_vars": [],              # Required environment variables
    "target_port": 8000,                  # Port the container will listen on (default: 8000)
    "app_name": "mcp-server-app",         # Suggested Fly.io app name
    "primary_region": "ord"               # Suggested Fly.io primary region
}
```

## Configuration Options

### Supported Runtimes
- `python`: Python runtime with version specification
- `node`: Node.js runtime with version specification
- `go`: Go runtime
- `binary`: Custom binary deployment

### Deployment Regions
Fly.io regions can be specified using the `primary_region` parameter. Common options:
- `ord`: Chicago
- `iad`: Northern Virginia
- `dfw`: Dallas
- `lax`: Los Angeles
- `bom`: Mumbai

## Example

Here's a simple example of generating a deployment plan for a Node.js MCP server:

```python
{
    "server_command": "node",
    "server_args": ["index.js"],
    "runtime": "node",
    "runtime_version": "20",
    "dependencies": ["@modelcontextprotocol/server"],
    "target_port": 8080,
    "app_name": "my-mcp-server",
    "primary_region": "ord"
}
```

## Development

To contribute to the project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any problems or have questions, please [open an issue](https://github.com/yourusername/mcp-fly-deployer/issues).
