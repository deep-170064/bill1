import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Layout.css';

function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="layout">
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>🏪 SuperMarket</h2>
        </div>
        
        <nav className="sidebar-nav">
          <Link 
            to="/dashboard" 
            className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">Dashboard</span>
          </Link>
          
          <Link 
            to="/products" 
            className={`nav-item ${isActive('/products') ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon">📦</span>
            <span className="nav-text">Products</span>
          </Link>
          
          <Link 
            to="/sales" 
            className={`nav-item ${isActive('/sales') ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <span className="nav-icon">💰</span>
            <span className="nav-text">Sales</span>
          </Link>
          
          {(user?.role === 'ADMIN' || user?.role === 'MANAGER') && (
            <Link 
              to="/customers" 
              className={`nav-item ${isActive('/customers') ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="nav-icon">👥</span>
              <span className="nav-text">Customers</span>
            </Link>
          )}
          
          {user?.role === 'ADMIN' && (
            <Link 
              to="/employees" 
              className={`nav-item ${isActive('/employees') ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="nav-icon">👔</span>
              <span className="nav-text">Employees</span>
            </Link>
          )}
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">👤</div>
            <div className="user-details">
              <div className="user-name">{user?.name}</div>
              <div className="user-role">{user?.role}</div>
            </div>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      <div className="main-wrapper">
        <header className="topbar">
          <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="topbar-title">
            <h1>{location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2)}</h1>
          </div>
        </header>
        
        <main className="main-content">
          {children}
        </main>
      </div>
      
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>
      )}
    </div>
  );
}

export default Layout;
