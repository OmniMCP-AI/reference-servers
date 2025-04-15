import sqlite3

def get_schema() -> str:
    """Provides the schema of the tasks database."""
    conn = sqlite3.connect("data/tasks.db")
    schema = conn.execute("SELECT sql FROM sqlite_master WHERE type='table'").fetchall()
    conn.close()
    return "\n".join(sql[0] for sql in schema if sql[0])