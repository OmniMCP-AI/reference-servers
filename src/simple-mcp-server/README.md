# simple-mcp-server
Java Spring Boot simple MCP server implementation

## Description

The `simple-mcp-server` project includes two core services:

1. **GreetingsService**: This service is responsible for generating personalized greeting messages. It provides functionality to create dynamic and user-specific greetings based on input parameters.

2. **NumberService**: This service handles operations related to numbers, such as performing arithmetic calculations or generating random numbers. It is designed to support various numerical operations efficiently.

## Run it using the Docker image
Modify the `mcp.server` configuration

```json
{
    "servers": {
        "simple-mcp-server": {
            "command": "docker",
            "args": [
                "run",
                "-i",
                "--rm",
                "ghcr.io/marcelloraffaele/simple-mcp-server:main"
            ]
        }
        
    }
}
```

## Run it locally

1. Build the project
```bash
mvn clean install

```
2. Run the server
Change the `mcp.server` configuration adding the following:
```json

        "simple-mcp-server": {
            "type": "stdio",
            "command": "java",
            "args": [
                "-Dspring.ai.mcp.server.stdio=true",
                "-jar",
                "C:\\Workspaces\\......\\simple-mcp-server\target\\simple-mcp-server-0.0.1-SNAPSHOT.jar"
            ]
        }
```

## Run the server with Docker
1. Build the project
```bash
mvn clean install
docker build -t simplemcpserver:1.0 .
```

2. Run the server
Change the `mcp.server` configuration adding the following:
```json
        "simple-mcp-server": {
            "command": "docker",
            "args": [
                "run",
                "-i",
                "--rm",
                "simplemcpserver:1.0"
            ]
        }
```