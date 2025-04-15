# Use the official Python base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install the UV package manager
SHELL ["/bin/bash", "-c"]
RUN curl -LsSf https://astral.sh/uv/install.sh | sh && \
    uv venv && \
    source .venv/bin/activate && \
    uv pip install -e ".[dev]"

# Set environment variables
ENV PATH="/app/.venv/bin:$PATH"

# Copy the example environment file and prompt the user to edit it
RUN cp .env.example .env

# Expose the necessary port (replace 8000 with the correct port if different)
EXPOSE 8000

# Command to run when the container starts
CMD ["uvx", "groq-mcp"]