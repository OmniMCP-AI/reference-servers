# Start from a lightweight Python image since the project uses Python
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Install `uv`, a Rust-based Python package manager
RUN pip install setuptools wheel \
    && pip install uv

# Copy the project files into the container
COPY . .

# Create and activate a virtual environment, then install dependencies
RUN uv venv && . .venv/bin/activate && uv add "mcp[cli]" httpx

# Define the command to run the server; this will be wrapped by `omnimcp.yaml`
CMD ["uv", "run", "server.py"]