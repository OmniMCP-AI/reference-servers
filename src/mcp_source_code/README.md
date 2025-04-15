# MCP Weather Server Setup Guide

This guide walks you through setting up and running a weather server using the MCP SDK and `uv`, a Rust-based Python package manager.

## ✅ Prerequisites

Make sure you have the following installed before proceeding:

- [Claude.ai](https://claude.ai/) account (any account type works — MCP is supported)
- Claude Desktop App (available for macOS and Windows)
- Code Editor (e.g., [Visual Studio Code](https://code.visualstudio.com/))
- `uv` — A fast Python package manager written in Rust

### Install `uv`:

#### macOS (via Homebrew):
brew install uv


#### Windows (via WinGet):
winget install --id=astral-sh.uv -e


## ⚙️ Project Setup

Follow these steps to create and configure the project environment:

1. Create the project folder:
mkdir mcp-server-weather cd mcp-server-weather


2. Initialize a new `uv` project:
uv init


3. Create a virtual environment:
uv venv


4. Activate the virtual environment:

**macOS / Linux:**
source .venv/bin/activate


**Windows (PowerShell):**
.venv\Scripts\Activate.ps1


To deactivate the virtual environment:
deactivate


5. Install required packages:
uv add "mcp[cli]" httpx


## 🚀 Running and Testing the MCP Server

1. Start the MCP server in development mode:
mcp dev server.py


2. Open [http://localhost:5173](http://localhost:5173) in your browser

3. In the MCP Inspector:
   - Click **Connect**
   - Go to the **Tools** tab
   - Click **List Tools**
   - Select **get_current_weather**
   - Enter latitude and longitude (e.g., `63.4463991, 10.8127596`)
   - The **Tool Result** section will display the JSON weather data

4. To stop the server:
Ctrl+C


## 📝 Notes

- Ensure your server script is named `server.py` and located in the root of your project.
- The MCP Inspector is a helpful tool for interacting with and debugging tools during development.