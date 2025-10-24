import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { dashboard, reports } from '../services/api';
import '../styles/Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [salesTrend, setSalesTrend] = useState([]);
  const [categorySales, setCategorySales] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState(7);

  useEffect(() => {
    loadDashboardData();
  }, [dateRange]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, salesRes, categoryRes, productsRes] = await Promise.all([
        dashboard.getStats(),
        reports.getSalesByDate(dateRange),
        reports.getCategorySales(),
        reports.getTopProducts(5),
      ]);
      
      setStats(statsRes.data);
      setSalesTrend(salesRes.data.sales_by_date);
      setCategorySales(categoryRes.data.category_sales);
      setTopProducts(productsRes.data.top_products);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>📊 Dashboard Overview</h1>
          <p className="dashboard-subtitle">Welcome back! Here's your business summary</p>
        </div>
        <div className="date-range-selector">
          <label>Sales Period:</label>
          <select value={dateRange} onChange={(e) => setDateRange(Number(e.target.value))}>
            <option value={7}>Last 7 Days</option>
            <option value={14}>Last 14 Days</option>
            <option value={30}>Last 30 Days</option>
            <option value={90}>Last 90 Days</option>
          </select>
        </div>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card gradient-blue">
          <div className="stat-content">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <h3>Total Products</h3>
              <p className="stat-value">{stats?.total_products || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="stat-card gradient-green">
          <div className="stat-content">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>Total Sales</h3>
              <p className="stat-value">{stats?.total_sales || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="stat-card gradient-purple">
          <div className="stat-content">
            <div className="stat-icon">💵</div>
            <div className="stat-info">
              <h3>Total Revenue</h3>
              <p className="stat-value">₹{stats?.total_revenue?.toFixed(2) || '0.00'}</p>
            </div>
          </div>
        </div>
        
        <div className="stat-card gradient-orange">
          <div className="stat-content">
            <div className="stat-icon">⚠️</div>
            <div className="stat-info">
              <h3>Low Stock Items</h3>
              <p className="stat-value">{stats?.low_stock_count || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="stat-card gradient-pink">
          <div className="stat-content">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <h3>Today's Sales</h3>
              <p className="stat-value">₹{stats?.today_sales?.toFixed(2) || '0.00'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h2>📈 Sales Trend (Last {dateRange} Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#667eea" strokeWidth={3} name="Revenue (₹)" dot={{ fill: '#667eea', r: 6 }} />
              <Line type="monotone" dataKey="count" stroke="#764ba2" strokeWidth={3} name="Sales Count" dot={{ fill: '#764ba2', r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>🎯 Category Sales Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categorySales}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categorySales.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card wide">
          <h2>🏆 Top 5 Products by Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="product" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Legend />
              <Bar dataKey="revenue" fill="url(#colorRevenue)" name="Revenue (₹)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#667eea" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#764ba2" stopOpacity={0.9}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
