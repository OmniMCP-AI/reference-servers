# Omni Server

**Omni Server** is a Model Context Protocol (MCP) server designed to help developers familiarize themselves with the MCP framework. It serves as a foundational tool for understanding and implementing MCP-based applications.

---

## Features

- 🚀 MCP server implementation using Python
- 📁 Modular project structure with clear separation of prompts, tools, data, and resources
- ⚙️ Easily configurable with `.env` and Poetry
- 🧠 Designed to integrate seamlessly with **Claude Desktop**

---

## Project Structure

```
omni-server/
├── data/           # Data files and datasets
├── prompts/        # Prompt templates and related files
├── resources/      # Static resources and assets
├── tools/          # Utility scripts and tools
├── utils/          # Helper functions and utilities
├── .env            # Environment variable definitions
├── .gitignore      # Git ignore rules
├── .python-version # Python version specification
├── README.md       # Project documentation
├── main.py         # Main application entry point
├── pyproject.toml  # Project metadata and dependencies
├── server.py       # Server initialization and configuration
└── uv.lock         # Dependency lock file
```

---

## Getting Started

### Prerequisites

- Python 3.8 or higher
- [uv](https://github.com/astral-sh/uv) for dependency management

---

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/abhijithk1/omni-server.git
cd omni-server
```

2. Install dependencies using uv:

```bash
uv venv
uv pip install -r requirements.txt  # if using requirements.txt

# or, better:
uv pip install -e .  # if pyproject.toml is used
```

3. Activate the virtual environment (if needed):

```bash
source .venv/bin/activate  # macOS/Linux
.venv\Scripts\activate     # Windows
```

4. **Create a `.env` file** (if required) with any necessary environment variables.


---

## Dependencies

All required packages are defined in `pyproject.toml`. You can install them using:

```bash
uv pip install -e .
```

---

## Running the Server

To run manually via terminal:

```bash
uv pip install -e .  # ensure it's installed
python main.py

```

Or if you're using a virtual environment:

```bash
.venv/Scripts/python.exe main.py
```

---

## 🧩 Integrating with Claude Desktop

To use this server with **Claude Desktop**, configure your `claude_desktop_config.json` like so:

```json
{
  "mcpServers": {
    "omni_server": {
      "command": "<PATH TO PROJECT>\\.venv\\Scripts\\python.exe",
      "args": [
        "<PATH TO PROJECT>\\main.py"
      ],
      "cwd": "<PATH TO PROJECT>"
    }
  }
}
```

Make sure:
- The path to the Python executable is correct
- Your virtual environment (.venv) is created and installed via uv
- Claude Desktop is configured to recognize the MCP server

Once that's done, Omni Server will run as an MCP-compatible backend inside Claude Desktop!

---

## Contributing

Contributions are welcome! Fork the repository, make changes, and open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
