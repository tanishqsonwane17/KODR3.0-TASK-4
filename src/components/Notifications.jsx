import { useChat } from '../context/useChat';
import '../styles/Notifications.css';

function Notifications() {
  const { notifications, clearNotifications } = useChat();

  return (
    <div className="notifications-panel">
      <div className="notifications-header">
        <h3>🔔 Notifications</h3>
        {notifications.length > 0 && (
          <button className="clear-btn" onClick={clearNotifications}>
            Clear All
          </button>
        )}
      </div>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <p className="empty-notifications">No notifications</p>
        ) : (
          notifications.map((notification) => (
            <div key={notification.id} className="notification-item">
              <p>{notification.message}</p>
              <span className="notification-time">{notification.timestamp}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notifications;
