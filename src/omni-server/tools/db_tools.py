from utils.helpers import query_database

def query_tasks(sql: str) -> str:
    """Executes an SQL query on the tasks database and returns a summary."""
    return query_database(sql)