from utils.helpers import summarize_file

def summarize_csv_file(filename: str) -> str:
    """Summarizes a CSV file by returning its row count, columns, and first row."""
    return summarize_file(filename)