Local setup guide

1) Create a virtual environment (recommended)

   On Windows PowerShell:

   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```

2) Install Python dependencies

   ```powershell
   python -m pip install --upgrade pip
   python -m pip install -r requirements.txt
   ```

3) Initialize the database

   - To use the bundled SQLite DB (quick start):

     ```powershell
     python init_db.py
     ```

   - To use PostgreSQL (ensure Postgres is running and accessible):

     Set these environment variables (example):

     ```powershell
     $env:DB_TYPE = 'postgres'
     $env:PGHOST = 'localhost'
     $env:PGDATABASE = 'mart_db'
     $env:PGUSER = 'postgres'
     $env:PGPASSWORD = 'your_password_here'
     $env:PGPORT = '5432'
     python init_db_postgres.py
     ```

Notes

- The project expects `DB_TYPE` to be either `sqlite` (default) or `postgres`.
- `bcrypt` and other dependencies are listed in `requirements.txt` and will be installed by the pip step above.
- If you prefer system-wide installs, omit the virtualenv steps but be aware of version differences.
