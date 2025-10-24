import os
from sqlalchemy import create_engine
import urllib.parse

# PostgreSQL Configuration (using environment variables)
DB_HOST = os.getenv("PGHOST", "localhost")
DB_NAME = os.getenv("PGDATABASE", "mart_db")
DB_USER = os.getenv("PGUSER", "postgres")
DB_PASS = os.getenv("PGPASSWORD", "")
DB_PORT = os.getenv("PGPORT", "5432")

# URL encode special characters in password for SQLAlchemy
encoded_pass = urllib.parse.quote_plus(DB_PASS)
CONNECTION_STRING = f"postgresql+psycopg2://{DB_USER}:{encoded_pass}@{DB_HOST}:{DB_PORT}/{DB_NAME}"


def get_connection_string():
    """Returns the PostgreSQL connection string for SQLAlchemy"""
    return CONNECTION_STRING


def get_engine():
    """Creates and returns a SQLAlchemy engine instance"""
    try:
        engine = create_engine(get_connection_string(), echo=False, pool_pre_ping=True)
        return engine
    except Exception as e:
        print(f"Error creating SQLAlchemy engine: {e}")
        return None
