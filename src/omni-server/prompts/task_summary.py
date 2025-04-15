def task_summary_prompt(arguments: dict) -> str:
    """Template for summarizing tasks."""
    return (
        f"Summarize the following task data concisely:\n"
        f"Arguments: {arguments}\n"
        "Focus on key details like title and priority."
    )