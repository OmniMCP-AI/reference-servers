# mcp_server_generator.py
import os
from mcp.server.fastmcp import FastMCP, Context
from pydantic import BaseModel, Field
from typing import List, Optional
import shlex # Import added for quoting
import json # Import added for JSON handling

mcp = FastMCP("MCP Server Deployer")

class FileInfo(BaseModel):
    path: str = Field(..., description="Relative path inside the container's WORKDIR")
    content: str = Field(..., description="File content")

class GeneratePlanInput(BaseModel):
    # Default to Node.js as runtime with a common script name
    server_command: str = Field(default="node", description="Command to run the target stdio server (e.g., 'node index.js')")
    server_args: List[str] = Field(default_factory=lambda: ["index.js"], description="Arguments for the server command")
    runtime: str = Field(default="node", description="Runtime ('python', 'node', 'go', 'binary')")
    runtime_version: Optional[str] = Field(default="20", description="Specific runtime version (e.g., '3.11', '20')")
    dependencies: List[str] = Field(default_factory=list, description="List of dependencies (pip, npm, etc.)")
    requirements_file_content: Optional[str] = Field(None, description="Content of requirements.txt for Python")
    files_to_create: List[FileInfo] = Field(default_factory=list, description="Files to create in the image")
    required_env_vars: List[str] = Field(default_factory=list, description="Required environment variable names (set via secrets)")
    target_port: int = Field(default=8080, description="Port the container will listen on")
    app_name: Optional[str] = Field(default="mcp-server-app", description="Suggested Fly.io app name (will be generated if None)")
    primary_region: Optional[str] = Field(default="ord", description="Suggested Fly.io primary region (e.g., 'ord', 'iad', 'dfw')")
    # sse_path, message_path defaults are fine for most cases via supergateway

async def generate_dockerfile_content(params: GeneratePlanInput, ctx: Context) -> str:
    """Generates the Dockerfile content string."""
    await ctx.info("Starting Dockerfile generation")
    dockerfile_lines = []
    workdir = "/app"

    # --- Base Image ---
    if params.runtime == "python":
        version = params.runtime_version or "3.11"
        dockerfile_lines.append(f"FROM python:{version}-slim")
        await ctx.info(f"Using Python {version} slim base image")
    elif params.runtime == "node":
        version = params.runtime_version or "20"
        dockerfile_lines.append(f"FROM node:{version}-alpine")
        await ctx.info(f"Using Node.js {version} alpine base image")
    else:
        dockerfile_lines.append("FROM ubuntu:latest")
        await ctx.warn(f"Using generic Ubuntu base image for runtime '{params.runtime}'. Manual adjustment might be needed.")

    dockerfile_lines.append(f"\nWORKDIR {workdir}")

    # --- Install supergateway ---
    if params.runtime != "node":
        if "alpine" in dockerfile_lines[0]:
            dockerfile_lines.append("RUN apk add --no-cache nodejs npm")
        else:
             dockerfile_lines.append("RUN apt-get update && apt-get install -y --no-install-recommends nodejs npm && apt-get clean && rm -rf /var/lib/apt/lists/*")

    dockerfile_lines.append("RUN npm install -g --no-save supergateway")

    # --- Install dependencies ---
    # Always install all dependencies globally for NPM packages (easier for MCP servers)
    if params.runtime == "node" and params.dependencies:
        for dep in params.dependencies:
            dockerfile_lines.append(f'RUN npm install -g --no-save "{dep}"')
    
    # Python dependencies
    elif params.runtime == "python":
        if params.requirements_file_content:
            req_file_info = FileInfo(path="requirements.txt", content=params.requirements_file_content)
            if not any(f.path == req_file_info.path for f in params.files_to_create):
                params.files_to_create.append(req_file_info)
            dockerfile_lines.append(f"RUN pip install --no-cache-dir -r requirements.txt")
        elif params.dependencies:
            deps = " ".join(f'"{dep}"' for dep in params.dependencies)
            dockerfile_lines.append(f"RUN pip install --no-cache-dir {deps}")

    # Only copy application code if we're not using a pre-packaged MCP server
    is_prepackaged = params.server_command == "npx" or any(dep.startswith("@modelcontextprotocol/") for dep in params.dependencies)
    
    if not is_prepackaged:
        dockerfile_lines.append("# Copy application code (adjust if specific files/dirs needed)")
        dockerfile_lines.append("COPY . .")

    # --- Create Files ---
    if params.files_to_create:
        dockerfile_lines.append("\n# Create specified configuration files")
        for file_info in params.files_to_create:
            escaped_content = file_info.content.replace('\\', '\\\\').replace("'", "'\"'\"'").replace('`', '\\`').replace('$', '\\$')
            file_dir = os.path.dirname(file_info.path)
            if file_dir and file_dir != '.':
                 dockerfile_lines.append(f"RUN mkdir -p {shlex.quote(file_dir)}")
            dockerfile_lines.append(f"RUN echo '{escaped_content}' > {shlex.quote(file_info.path)}")

    # --- Environment Variables ---
    dockerfile_lines.append(f"\nENV PORT={params.target_port}")
    dockerfile_lines.append(f"ENV SSE_PATH=/sse")
    dockerfile_lines.append(f"ENV MESSAGE_PATH=/message")
    
    if params.required_env_vars:
        dockerfile_lines.append("\n# NOTE: Set the following environment variables using 'fly secrets set'")
        for env_var in params.required_env_vars:
            # Use a standard placeholder value instead of any sensitive data
            dockerfile_lines.append(f"# ENV {env_var}=<value>")

    # --- Expose Port ---
    dockerfile_lines.append(f"\nEXPOSE $PORT")

    # --- CMD ---
    stdio_cmd_parts = [params.server_command] + params.server_args
    stdio_cmd_str_escaped = " ".join(shlex.quote(part) for part in stdio_cmd_parts)
    
    dockerfile_lines.append("\n# Define the command to run supergateway and the target stdio server")
    dockerfile_lines.append('CMD npx supergateway \\')
    dockerfile_lines.append(f'    --stdio "{stdio_cmd_str_escaped}" \\')
    dockerfile_lines.append('    --port "$PORT" \\')
    dockerfile_lines.append('    --ssePath "$SSE_PATH" \\')
    dockerfile_lines.append('    --messagePath "$MESSAGE_PATH"')

    await ctx.info("Dockerfile generation completed")
    return "\n".join(dockerfile_lines)

def generate_fly_toml_content(params: GeneratePlanInput) -> str:
    """Generates minimal fly.toml content."""
    lines = []
    if params.app_name:
        lines.append(f'app = "{params.app_name}"')
    else:
        lines.append('# app = "your-fly-app-name" # Replace with the name Fly generates or choose your own')

    if params.primary_region:
        lines.append(f'primary_region = "{params.primary_region}"')
    else:
        lines.append('# primary_region = "..." # Choose a region (e.g., ewr, lax)')

    lines.append("\n[build]")
    lines.append('# builder = "dockerfile" # Assuming Dockerfile build')

    lines.append("\n[http_service]")
    lines.append(f"internal_port = {params.target_port}")
    lines.append("force_https = true")
    lines.append("auto_stop_machines = true") 
    lines.append("auto_start_machines = true")
    lines.append("min_machines_running = 0")
    lines.append("processes = ['app']")
        
    # Add VM specifications
    lines.append("\n[[vm]]")
    lines.append('memory = "1gb"')
    lines.append('cpu_kind = "shared"')
    lines.append('cpus = 1')

    return "\n".join(lines)

def generate_fly_commands(params: GeneratePlanInput) -> List[str]:
    """Generates the sequence of flyctl commands."""
    commands = []
    launch_cmd = ["fly", "launch", "--no-deploy", "--copy-config"]
    if params.app_name:
        launch_cmd.extend(["--name", params.app_name])
    if params.primary_region:
        launch_cmd.extend(["--region", params.primary_region])
    # Add --org if needed
    commands.append(" ".join(launch_cmd) + " # Answer prompts if needed, uses generated fly.toml")

    if params.required_env_vars:
        commands.append("\n# Set required secrets (replace '...' with actual values):\n")
        for var in params.required_env_vars:
            commands.append(f"fly secrets set {var}=...")

    commands.append("\nfly deploy")
    return commands


@mcp.tool()
async def generate_fly_deployment_plan(params: GeneratePlanInput, ctx: Context) -> str:
    """
    Generates a Dockerfile, fly.toml, and flyctl commands for deploying a
    stdio MCP server via supergateway on Fly.io.
    """
    try:
        await ctx.info(f"Starting deployment plan generation for {params.runtime} runtime")
        await ctx.info(f"Generating Dockerfile for command: {params.server_command}")
        dockerfile_content = await generate_dockerfile_content(params, ctx)
        
        await ctx.info("Generating fly.toml configuration")
        fly_toml_content = generate_fly_toml_content(params)
        await ctx.info(f"fly.toml generated with app name: {params.app_name}")
        
        await ctx.info("Preparing fly deployment commands")
        fly_commands = generate_fly_commands(params)
        await ctx.info("Fly commands prepared successfully")

        await ctx.info("Formatting final deployment plan")
        result_markdown = f"""
:wave: I've whipped up a Fly.io deployment plan for your MCP server using Brave Search. Here's your handy guide:


:rocket: *Fly.io Deployment Plan for MCP Server*


:one: *Dockerfile*
Create a `Dockerfile` with the following content:

```
{dockerfile_content}
```


:two: *fly.toml Configuration*
Create a `fly.toml` file:

```
{fly_toml_content}
```


:three: *Terminal Commands*
Run these commands in your terminal:

```
{' '.join(fly_commands)}
```


:warning: *Important Notes*

• Replace placeholder values in `fly secrets set` commands with your actual secrets
• Review the generated files before deploying
• No health checks are configured in this deployment
"""
        await ctx.info("=== Complete Deployment Plan ===")
        await ctx.info(result_markdown)
        await ctx.info("Deployment plan generation completed successfully")
        return result_markdown

    except Exception as e:
        await ctx.error(f"Error generating deployment plan: {str(e)}")
        import traceback
        traceback.print_exc()
        return f"Error: Failed to generate deployment plan - {str(e)}"

# --- Main execution (for running this generator server itself) ---
if __name__ == "__main__":
    mcp.run(transport='sse')