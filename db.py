# db.py
import os
from sqlalchemy import create_engine
import psycopg2
import urllib.parse

# Database credentials from environment variables
DB_HOST = os.getenv("PGHOST", "localhost")
DB_NAME = os.getenv("PGDATABASE", "mart_db")
DB_USER = os.getenv("PGUSER", "postgres")
DB_PASS = os.getenv("PGPASSWORD", "")
DB_PORT = os.getenv("PGPORT", "5432")


def get_connection():
    """
    Establishes a raw psycopg2 connection (for direct SQL execution).
    Use only if you need low-level cursor operations.
    """
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            database=DB_NAME,
            user=DB_USER,
            password=DB_PASS,
            port=DB_PORT
        )
        return conn
    except Exception as e:
        print(f"Error connecting with psycopg2: {e}")
        return None


def get_connection_string():
    """
    Returns a SQLAlchemy-compatible connection string.
    Example format:
    postgresql+psycopg2://user:password@host:port/database
    """
    encoded_pass = urllib.parse.quote_plus(DB_PASS)
    return f"postgresql+psycopg2://{DB_USER}:{encoded_pass}@{DB_HOST}:{DB_PORT}/{DB_NAME}"


def get_engine():
    """
    Creates and returns a SQLAlchemy engine instance.
    Use this in reports.py with pandas or SQLAlchemy ORM.
    """
    try:
        engine = create_engine(get_connection_string(), pool_pre_ping=True)
        return engine
    except Exception as e:
        print(f"Error creating SQLAlchemy engine: {e}")
        return None