import { useState, useEffect } from 'react';
import { notifications } from '../services/api';
import '../styles/Notifications.css';

function Notifications() {
  const [notificationList, setNotificationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await notifications.getAll();
      setNotificationList(res.data.notifications);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await notifications.update(notificationId, 'read');
      loadNotifications();
    } catch (error) {
      alert('Failed to update notification: ' + (error.response?.data?.detail || error.message));
    }
  };

  const filteredNotifications = notificationList.filter(n => {
    if (filter === 'all') return true;
    return n.status === filter;
  });

  const unreadCount = notificationList.filter(n => n.status === 'unread').length;

  if (loading) {
    return <div className="loading">Loading notifications...</div>;
  }

  return (
    <div className="notifications-page">
      <div className="page-header">
        <h1>🔔 Notifications</h1>
        <div className="notification-badge">{unreadCount} Unread</div>
      </div>

      <div className="filter-bar">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All ({notificationList.length})
        </button>
        <button 
          className={filter === 'unread' ? 'active' : ''} 
          onClick={() => setFilter('unread')}
        >
          Unread ({unreadCount})
        </button>
        <button 
          className={filter === 'read' ? 'active' : ''} 
          onClick={() => setFilter('read')}
        >
          Read ({notificationList.length - unreadCount})
        </button>
      </div>

      <div className="notifications-list">
        {filteredNotifications.length === 0 ? (
          <div className="no-notifications">
            <p>No notifications to display</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div 
              key={notification.notification_id} 
              className={`notification-item ${notification.status}`}
            >
              <div className="notification-icon">
                {notification.type === 'low_stock' ? '⚠️' : '📢'}
              </div>
              <div className="notification-content">
                <p className="notification-message">{notification.message}</p>
                <div className="notification-meta">
                  <span className="notification-time">
                    {new Date(notification.created_at).toLocaleString()}
                  </span>
                  {notification.product_name && (
                    <span className="notification-product">
                      Product: {notification.product_name}
                    </span>
                  )}
                </div>
              </div>
              {notification.status === 'unread' && (
                <button 
                  className="btn-mark-read" 
                  onClick={() => markAsRead(notification.notification_id)}
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notifications;
