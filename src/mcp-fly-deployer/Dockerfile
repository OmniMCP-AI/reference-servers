FROM python:3.11-slim

WORKDIR /app

# Install Python dependencies
RUN pip install --no-cache-dir mcp-server[fastmcp] pydantic typing-extensions

# Copy the MCP server generator
COPY mcp_server_generator.py .

# Set environment variable for the port
ENV PORT=8000

# Expose the port
EXPOSE 8000

# Run the MCP server directly with SSE transport
CMD python mcp_server_generator.py
