# server.py
from mcp.server.fastmcp import FastMCP
import os

# Create an MCP server
mcp = FastMCP("AI Sticky Notes")

NOTES_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "notes.txt")

def ensure_file():
    """Ensure the notes file exists"""
    if not os.path.exists(NOTES_FILE):
        with open(NOTES_FILE, "w") as f:
            f.write("")

# Add an addition tool
@mcp.tool()
def add_note(message: str) -> str:
    """
    Append a new note to the sticky notes file.

    :param message: The note to add
    :return: A confirmation message
    """
    ensure_file()
    with open(NOTES_FILE, "a") as f:
        f.write(message + "\n")
    return f"Note added: {message}"

@mcp.tool()
def read_notes() -> str:
    """
    Read all notes from the sticky notes file.

    :return: The contents of the notes file
    """
    ensure_file()
    with open(NOTES_FILE, "r") as f:
        notes = f.read().strip()
    return notes if notes else "No notes found."

@mcp.resource("notes://latest")
def get_latest_note() -> str:
    """
    Get the latest note from the sticky notes file.

    :return: The latest note
    """
    ensure_file()
    with open(NOTES_FILE, "r") as f:
        notes = f.readlines()
    return notes[-1].strip() if notes else "No notes found."

@mcp.prompt()
def note_summary_prompt(notes: str) -> str:
    """
    Generate a summary of the notes.

    :param notes: The notes to summarize
    :return: A summary of the notes
    """
    with open(NOTES_FILE, "r") as f:
        notes = f.read().strip()
    if not notes:
        return "No notes found."
    return f"Summary of your notes:\n{notes}"