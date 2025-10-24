# SuperMarket Inventory & Billing Management System

A full-stack retail management system built with **Python FastAPI** (backend) and **React + Vite** (frontend), designed for supermarkets to manage inventory, sales, employees, suppliers, and analytics.

## 🚀 Features

### Core Functionality
- **Role-Based Access Control**: Admin, Manager, and Cashier roles with different permissions
- **Product Management**: Add, edit, delete products with barcode support
- **Sales Processing**: Complete point-of-sale system with payment methods (Cash, Card, UPI, Wallet)
- **Inventory Tracking**: Real-time stock levels with low-stock notifications
- **Customer Management**: Track customer information and purchase history
- **Employee Management**: Manage staff accounts and roles

### Advanced Features
- **Supplier Management**: Track suppliers, contact info, and reliability scores
- **Category Management**: Organize products by categories
- **Purchase Orders**: Create and manage inventory replenishment orders
- **Analytics Dashboard**: 
  - Sales trends with flexible date ranges (7, 14, 30, 90 days)
  - Category performance metrics
  - Top selling products
  - Real-time business statistics
- **Notifications System**: Automated alerts for low stock and important events
- **Reports Generation**: Export data in CSV, JSON, and TXT formats

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **PostgreSQL** - Production database
- **SQLAlchemy** - Database ORM
- **Pandas** - Data analysis and reporting
- **Uvicorn** - ASGI server

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **Axios** - HTTP client

## 📋 Prerequisites

Before running this project on your PC, ensure you have:

1. **Python 3.8+** - [Download Python](https://www.python.org/downloads/)
2. **Node.js 16+** - [Download Node.js](https://nodejs.org/)
3. **PostgreSQL 12+** - [Download PostgreSQL](https://www.postgresql.org/download/)
4. **Git** (optional) - [Download Git](https://git-scm.com/)

## 🔧 Installation & Setup

### Step 1: Clone or Download the Project

```bash
# If using Git
git clone <repository-url>
cd supermarket-management

# Or download and extract the ZIP file
```

### Step 2: Database Setup

1. **Install PostgreSQL** on your system

2. **Create a new database**:
   ```bash
   # Open PostgreSQL terminal (psql)
   psql -U postgres
   
   # Create database
   CREATE DATABASE mart_db;
   
   # Create a user (optional, or use default postgres user)
   CREATE USER mart_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE mart_db TO mart_user;
   
   # Exit psql
   \q
   ```

3. **Apply the database schema**:
   ```bash
   # The schema file is in attached_assets/schema_1761298988728.sql
   psql -U postgres -d mart_db -f attached_assets/schema_1761298988728.sql
   ```

### Step 3: Backend Setup

1. **Navigate to project root** (if not already there):
   ```bash
   cd /path/to/supermarket-management
   ```

2. **Create a virtual environment** (recommended):
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate
   
   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**:
   
   Create a `.env` file in the project root:
   ```bash
   # Windows
   type nul > .env
   
   # macOS/Linux
   touch .env
   ```
   
   Add the following to `.env`:
   ```env
   # Database Configuration
   PGHOST=localhost
   PGDATABASE=mart_db
   PGUSER=postgres
   PGPASSWORD=your_postgres_password
   PGPORT=5432
   ```

### Step 4: Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

3. **Return to project root**:
   ```bash
   cd ..
   ```

## ▶️ Running the Application

You need to run **both** backend and frontend servers:

### Option 1: Run in Separate Terminals (Recommended)

**Terminal 1 - Backend Server:**
```bash
# From project root
uvicorn api_server:app --host 127.0.0.1 --port 8000 --reload
```

**Terminal 2 - Frontend Server:**
```bash
# From project root
cd frontend
npm run dev
```

### Option 2: Run with a Process Manager

If you have `concurrently` installed globally:
```bash
npm install -g concurrently
concurrently "uvicorn api_server:app --host 127.0.0.1 --port 8000 --reload" "cd frontend && npm run dev"
```

## 🌐 Access the Application

Once both servers are running:

- **Frontend**: Open your browser and go to `http://localhost:5000`
- **Backend API**: `http://localhost:8000` (API endpoints)
- **API Documentation**: `http://localhost:8000/docs` (Swagger UI)

## 👤 Demo Credentials

Login with these demo accounts:

| Role     | Username | Password     |
|----------|----------|--------------|
| Admin    | alicej   | admin123     |
| Manager  | carold   | manager123   |
| Cashier  | emma     | cashier123   |

## 📁 Project Structure

```
supermarket-management/
├── frontend/                    # React frontend
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API services
│   │   ├── styles/             # CSS styles
│   │   └── context/            # React context
│   ├── package.json
│   └── vite.config.js
│
├── attached_assets/            # Database schema
│   └── schema_1761298988728.sql
│
├── api_server.py              # FastAPI backend server
├── db_config.py               # Database configuration
├── db.py                      # Database connection
├── auth.py                    # Authentication module
├── product_management.py      # Product CRUD operations
├── sales_management.py        # Sales processing
├── customer_management.py     # Customer management
├── employee_management.py     # Employee management
├── inventory_management.py    # Inventory tracking
├── analytics.py               # Analytics engine
├── report.py                  # Report generation
├── supplier_analytics.py      # Supplier analysis
├── category_analytics.py      # Category analysis
├── inventory_optimization.py  # Inventory optimization
├── requirements.txt           # Python dependencies
└── README.md                  # This file
```

## 🔑 Key Features by Role

### Admin
- Full access to all features
- Employee management
- Supplier management
- Category management
- System configuration

### Manager
- View all analytics and reports
- Manage customers
- Create purchase orders
- View inventory and sales

### Cashier
- Process sales
- View products
- Basic dashboard access

## 🐛 Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running: `pg_isready`
- Check credentials in `.env` file
- Ensure database `mart_db` exists

### Backend Won't Start
- Check Python version: `python --version`
- Verify all dependencies installed: `pip list`
- Check for port conflicts on 8000

### Frontend Won't Start
- Check Node.js version: `node --version`
- Clear cache: `rm -rf frontend/node_modules && cd frontend && npm install`
- Check for port conflicts on 5000

### CORS Errors
- Ensure backend is running on port 8000
- Check Vite proxy configuration in `frontend/vite.config.js`

## 📝 Development Notes

### Making Database Changes
The project uses PostgreSQL. To modify the schema:
1. Edit the schema in `attached_assets/schema_1761298988728.sql`
2. Reapply to database: `psql -U postgres -d mart_db -f attached_assets/schema_1761298988728.sql`

### Adding New Features
- **Backend**: Add endpoints in `api_server.py`
- **Frontend**: Create components in `frontend/src/pages/` or `frontend/src/components/`
- **Styling**: Add CSS in `frontend/src/styles/`

## 📊 Analytics Features

The dashboard provides comprehensive analytics:
- **Sales Trends**: Line charts showing daily sales over customizable periods
- **Category Performance**: Pie charts showing revenue distribution
- **Top Products**: Bar charts of best-selling items
- **Real-time Stats**: Total sales, products, customers, and low stock alerts

## 🔒 Security Notes

- Passwords are stored in plain text in development mode
- For production, enable bcrypt hashing (set `USE_BCRYPT=True` in `db_config.py`)
- Use strong passwords and change default credentials
- Keep `.env` file secure and never commit to version control

## 📜 License

This project is for educational and commercial use.

## 🤝 Support

For issues or questions, please check:
1. This README for common solutions
2. API documentation at `http://localhost:8000/docs`
3. Console logs in browser (F12) and terminal

---

**Happy Managing! 🏪**
