# Quick Start Guide - Run on Your PC

This is the fastest way to get the SuperMarket Management System running on your local computer.

## ⚡ 5-Minute Setup

### Prerequisites Check
Before you start, make sure you have:
- [ ] Python 3.8 or higher
- [ ] Node.js 16 or higher
- [ ] PostgreSQL 12 or higher

**Quick Check:**
```bash
python --version    # Should show 3.8+
node --version      # Should show 16+
psql --version      # Should show 12+
```

## Step 1: Database Setup (2 minutes)

```bash
# Create database
psql -U postgres
CREATE DATABASE mart_db;
\q

# Apply schema (replace path as needed)
psql -U postgres -d mart_db -f attached_assets/schema_1761298988728.sql
```

## Step 2: Backend Setup (1 minute)

```bash
# Install Python packages
pip install -r requirements.txt

# Create .env file with your database credentials
# On Windows:
echo PGHOST=localhost > .env
echo PGDATABASE=mart_db >> .env
echo PGUSER=postgres >> .env
echo PGPASSWORD=your_password >> .env
echo PGPORT=5432 >> .env

# On macOS/Linux:
cat > .env << EOF
PGHOST=localhost
PGDATABASE=mart_db
PGUSER=postgres
PGPASSWORD=your_password
PGPORT=5432
EOF
```

## Step 3: Frontend Setup (1 minute)

```bash
cd frontend
npm install
cd ..
```

## Step 4: Run the Application (1 minute)

### Open Two Terminal Windows:

**Terminal 1 - Backend:**
```bash
uvicorn api_server:app --host 127.0.0.1 --port 8000 --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Step 5: Access the Application

Open your browser and go to: **http://localhost:5000**

Login with demo credentials:
- **Admin**: username `alicej`, password `admin123`
- **Manager**: username `carold`, password `manager123`
- **Cashier**: username `emma`, password `cashier123`

---

## 🎉 You're Done!

The application should now be running with:
- ✅ Backend API on port 8000
- ✅ Frontend UI on port 5000
- ✅ PostgreSQL database connected

## 🔧 Troubleshooting

### "Database connection failed"
- Check PostgreSQL is running: `pg_isready`
- Verify credentials in `.env` file
- Make sure database `mart_db` exists

### "Port already in use"
- **Port 8000**: Another app is using it. Change backend port or stop the other app
- **Port 5000**: Change frontend port in `vite.config.js`

### "Module not found"
- **Python**: Run `pip install -r requirements.txt` again
- **Node.js**: Run `cd frontend && npm install` again

### "Cannot connect to backend"
Make sure:
1. Backend is running on port 8000
2. Frontend proxy is configured (already set in `vite.config.js`)
3. No firewall is blocking the connection

---

## 📚 Next Steps

After successful setup:
1. ✅ Explore the dashboard and analytics
2. ✅ Try creating products, sales, and customers
3. ✅ Test different user roles (Admin, Manager, Cashier)
4. ✅ Check out purchase orders and supplier management
5. ✅ Review the full README.md for advanced features

## 🚀 For Production Deployment

To deploy this to a production server:
1. Enable password hashing (set `USE_BCRYPT=True` in `db_config.py`)
2. Change all default passwords
3. Use environment variables for all sensitive data
4. Set up HTTPS/SSL
5. Configure a production WSGI server (e.g., Gunicorn)
6. Use a reverse proxy (e.g., Nginx)

---

**Need Help?** Check the full README.md for detailed documentation.
