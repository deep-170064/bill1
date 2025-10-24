# Project Structure & File Descriptions

This document explains every file in the project and its purpose.

## ✅ Verified Working Files

### Root Directory - Backend Python Files

| File | Purpose | Status |
|------|---------|--------|
| `api_server.py` | Main FastAPI backend server with all REST API endpoints | ✅ Working |
| `db_config.py` | PostgreSQL database configuration using environment variables | ✅ Working |
| `db.py` | Database connection and session management | ✅ Working |
| `auth.py` | Authentication module (login, logout, session management) | ✅ Working |
| `product_management.py` | Product CRUD operations (add, edit, delete, search) | ✅ Working |
| `sales_management.py` | Sales processing and transaction management | ✅ Working |
| `customer_management.py` | Customer management operations | ✅ Working |
| `employee_management.py` | Employee management and role assignment | ✅ Working |
| `inventory_management.py` | Inventory tracking and stock management | ✅ Working |
| `analytics.py` | Analytics engine for business intelligence | ✅ Working |
| `category_analytics.py` | Category performance analysis | ✅ Working |
| `supplier_analytics.py` | Supplier reliability and performance tracking | ✅ Working |
| `inventory_optimization.py` | Dead stock identification and clearance recommendations | ✅ Working |
| `report.py` | Report generation (CSV, JSON, TXT formats) | ✅ Working |
| `system_admin.py` | System administration utilities | ✅ Working |
| `cli.py` | Command-line interface (alternative to web UI) | ✅ Working |

### Configuration Files

| File | Purpose | Status |
|------|---------|--------|
| `requirements.txt` | Python dependencies list | ✅ Required |
| `replit.md` | Project documentation and preferences | ✅ Required |
| `README.md` | Complete setup and usage guide | ✅ Required |
| `.env` | Environment variables (user creates this) | 📝 User Creates |

### Frontend Directory (`frontend/`)

#### Configuration Files
| File | Purpose | Status |
|------|---------|--------|
| `package.json` | Node.js dependencies and scripts | ✅ Required |
| `package-lock.json` | Locked dependency versions | ✅ Required |
| `vite.config.js` | Vite build configuration with proxy setup | ✅ Required |
| `eslint.config.js` | Code linting configuration | ✅ Required |
| `index.html` | Main HTML entry point | ✅ Required |

#### Source Code (`frontend/src/`)

**Main Application Files:**
| File | Purpose | Status |
|------|---------|--------|
| `main.jsx` | React app entry point | ✅ Working |
| `App.jsx` | Main app component with routing | ✅ Working |
| `App.css` | Global application styles | ✅ Working |
| `index.css` | Base CSS styles | ✅ Working |

**Components (`frontend/src/components/`):**
| File | Purpose | Status |
|------|---------|--------|
| `Layout.jsx` | Navigation sidebar and layout wrapper | ✅ Working |

**Context (`frontend/src/context/`):**
| File | Purpose | Status |
|------|---------|--------|
| `AuthContext.jsx` | Authentication state management | ✅ Working |

**Services (`frontend/src/services/`):**
| File | Purpose | Status |
|------|---------|--------|
| `api.js` | Centralized API service with all endpoints | ✅ Working |

**Pages (`frontend/src/pages/`):**
| File | Purpose | Status |
|------|---------|--------|
| `Login.jsx` | User login page | ✅ Working |
| `Dashboard.jsx` | Analytics dashboard with flexible date ranges | ✅ Working |
| `Products.jsx` | Product management page | ✅ Working |
| `Sales.jsx` | Sales processing page | ✅ Working |
| `Customers.jsx` | Customer management page | ✅ Working |
| `Employees.jsx` | Employee management page (Admin only) | ✅ Working |
| `Suppliers.jsx` | Supplier management page (Admin only) | ✅ Working |
| `Categories.jsx` | Category management page (Admin only) | ✅ Working |
| `PurchaseOrders.jsx` | Purchase order management (Admin/Manager) | ✅ Working |
| `Notifications.jsx` | System notifications page | ✅ Working |

**Styles (`frontend/src/styles/`):**
| File | Purpose | Status |
|------|---------|--------|
| `Layout.css` | Navigation and layout styles | ✅ Working |
| `Login.css` | Login page styles | ✅ Working |
| `Dashboard.css` | Dashboard and charts styles | ✅ Working |
| `Products.css` | Products page styles | ✅ Working |
| `Sales.css` | Sales page styles | ✅ Working |
| `Customers.css` | Customers page styles | ✅ Working |
| `Employees.css` | Employees page styles | ✅ Working |
| `Suppliers.css` | Suppliers page styles | ✅ Working |
| `Categories.css` | Categories page styles | ✅ Working |
| `PurchaseOrders.css` | Purchase orders page styles | ✅ Working |
| `Notifications.css` | Notifications page styles | ✅ Working |

### Database Files (`attached_assets/`)

| File | Purpose | Status |
|------|---------|--------|
| `schema_1761298988728.sql` | Complete PostgreSQL database schema | ✅ Required |

## 🗑️ Files Removed (No Longer Needed)

These files were removed during cleanup:
- `init_db.py` - Old SQLite initialization (not needed for PostgreSQL)
- `init_db_postgres.py` - Temporary PostgreSQL init script (schema file used instead)
- `schema[1].sql` - Duplicate schema file
- `LOCAL_SETUP_GUIDE.md` - Old setup guide (replaced by README.md)
- `frontend/README.md` - Default Vite template readme
- `frontend/public/vite.svg` - Default Vite logo
- `frontend/src/assets/react.svg` - Default React logo

## 📊 Total File Count

- **Backend Python files**: 16 files
- **Frontend files**: 30+ files
- **Configuration files**: 5 files
- **Database files**: 1 file

**Total**: ~52 essential files

## 🔍 How to Verify Files Are Working

### Backend Verification
```bash
# Check for syntax errors
python -m py_compile api_server.py

# Test imports
python -c "import api_server; print('✅ Backend OK')"
```

### Frontend Verification
```bash
# Check for build errors
cd frontend
npm run build

# If build succeeds, all files are valid
```

### Database Verification
```bash
# Connect to database
psql -U postgres -d mart_db

# List tables
\dt

# Should show: categories, customers, employees, notifications, products, 
# purchase_order_items, purchase_orders, sale_items, sales, suppliers
```

## 🎯 Quick File Reference by Feature

### Authentication
- `auth.py` - Backend logic
- `frontend/src/context/AuthContext.jsx` - Frontend state
- `frontend/src/pages/Login.jsx` - UI

### Products
- `product_management.py` - Backend
- `frontend/src/pages/Products.jsx` - Frontend

### Sales
- `sales_management.py` - Backend
- `frontend/src/pages/Sales.jsx` - Frontend

### Analytics
- `analytics.py`, `category_analytics.py`, `supplier_analytics.py` - Backend
- `frontend/src/pages/Dashboard.jsx` - Frontend

### Suppliers
- Backend: Endpoints in `api_server.py`
- Frontend: `frontend/src/pages/Suppliers.jsx`

### Categories
- Backend: Endpoints in `api_server.py`
- Frontend: `frontend/src/pages/Categories.jsx`

### Purchase Orders
- Backend: Endpoints in `api_server.py`
- Frontend: `frontend/src/pages/PurchaseOrders.jsx`

### Notifications
- Backend: Endpoints in `api_server.py`
- Frontend: `frontend/src/pages/Notifications.jsx`

---

**Last Updated**: October 24, 2025  
**Project Status**: ✅ All files verified and working
