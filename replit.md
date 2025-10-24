# Overview

This is a SuperMarket Inventory & Billing Management System built with Python (FastAPI backend) and React (Vite frontend). The system provides role-based access control for Cashiers, Managers, and Admins to manage products, sales, inventory, employees, customers, suppliers, and analytics.

The application features both a CLI interface (Python) and a modern web interface (React), with comprehensive reporting, notifications, and analytics capabilities for business intelligence.

## Recent Updates (October 2025)

- ✅ Migrated from SQLite to PostgreSQL for production use
- ✅ Added complete CRUD operations for Suppliers, Categories, Purchase Orders, and Notifications
- ✅ Enhanced Dashboard with flexible date range analytics (7, 14, 30, 90 days)
- ✅ Implemented all missing frontend pages with modern UI design
- ✅ Cleaned up project structure and removed unnecessary files
- ✅ Created comprehensive setup documentation for local PC deployment

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Backend Architecture

**Framework**: FastAPI for RESTful API endpoints, Python CLI for terminal-based interaction

**Database Layer**: 
- PostgreSQL database (production-ready)
- SQLAlchemy for database abstraction and connection pooling
- Raw psycopg2 connections available for PostgreSQL-specific operations
- Secure database configuration through environment variables (PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT)

**Authentication & Authorization**:
- Session-based authentication (no JWT tokens currently)
- Plain text password storage in development mode (USE_BCRYPT flag disabled)
- Role-based access control: CASHIER, MANAGER, ADMIN
- Global session state tracking (current_user, current_role, current_name)
- Permission decorator pattern for role-based endpoint/function protection

**Modular Architecture**:
- Separated concerns across modules: auth, product_management, sales_management, employee_management, customer_management, inventory_management, analytics, reports
- CLI entry point (cli.py) with role-based menu system
- API server (api_server.py) for web frontend communication

**Data Export**: 
- Pandas-based reporting with multi-format export (CSV, JSON, TXT/Markdown)
- Tabulate library for console table formatting

## Frontend Architecture

**Framework**: React 19.1 with Vite build tooling

**Routing**: React Router DOM for client-side navigation

**State Management**: Component-level state (no Redux/global state management)

**API Communication**: 
- Axios for HTTP requests
- Centralized API service layer (src/services/api.js)
- Proxy configuration in Vite to route `/api` requests to backend (localhost:8000)

**UI Components**:
- Dashboard with metrics and charts (Recharts library)
- Role-based navigation and feature access
- Modular page components (Products, Sales, Customers, Employees, Suppliers, Categories, etc.)
- Responsive design with custom CSS modules

**Development Server**:
- Vite dev server on port 5000
- HMR (Hot Module Replacement) configured for Replit environment
- CORS enabled on backend for cross-origin requests

## Database Schema

**Core Tables**:
- `employees`: User accounts with roles (CASHIER, MANAGER, ADMIN)
- `products`: Inventory items with barcode, price, stock levels, low_stock_threshold
- `categories`: Product categorization
- `suppliers`: Vendor information with reliability scoring
- `customers`: Customer records for sales tracking
- `sales`: Transaction records with timestamps and payment methods
- `sale_items`: Line items for each sale (junction table)
- `purchase_orders`: Inventory replenishment tracking
- `purchase_order_items`: Items in purchase orders
- `notifications`: System alerts and messages

**Key Relationships**:
- Products → Categories (many-to-one)
- Products → Suppliers (many-to-one)
- Sales → Customers (many-to-one, optional)
- Sales → Employees (many-to-one, tracks who processed sale)
- Sales ↔ Products (many-to-many through sale_items)

**Analytics Features**:
- Category performance tracking (revenue, units sold, stock health)
- Supplier scorecards (reliability, delivery tracking, revenue contribution)
- Dead stock identification (items not sold in 60-90+ days)
- Inventory optimization with clearance pricing recommendations
- Low stock alerts and threshold management

## External Dependencies

**Python Backend**:
- FastAPI: Web framework for REST API
- SQLAlchemy: Database ORM and connection management
- psycopg2-binary: PostgreSQL adapter
- bcrypt: Password hashing (currently disabled in development)
- Pandas: Data analysis and report generation
- Tabulate: Console table formatting
- Pydantic: Request/response validation
- Uvicorn: ASGI server for FastAPI

**React Frontend**:
- React & React DOM: UI framework
- React Router DOM: Client-side routing
- Axios: HTTP client
- Recharts: Data visualization and charting
- Vite: Build tool and development server
- ESLint: Code linting

**Database**:
- PostgreSQL: Production database configured via environment variables

**Development Tools**:
- Python virtual environment (venv)
- Node.js package manager (npm)
- ESLint for JavaScript code quality

**Deployment Considerations**:
- Backend expects to run on port 8000
- Frontend dev server on port 5000
- Frontend proxy configured to forward `/api` to backend
- Environment variables required for PostgreSQL: PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT, DB_TYPE