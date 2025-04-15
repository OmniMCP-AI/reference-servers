import sqlite3
import pandas as pd

def setup_database():
    conn = sqlite3.connect("data/tasks.db")
    df = pd.read_csv("data/tasks.csv")
    df.to_sql("tasks", conn, if_exists="replace", index=False)
    conn.close()

if __name__ == "__main__":
    setup_database()