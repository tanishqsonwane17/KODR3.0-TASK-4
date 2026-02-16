import { useChat } from '../context/useChat';
import '../styles/Sidebar.css';
import CreateGroupModal from './CreateGroupModal';
import { useState } from 'react';

function Sidebar() {
  const { groups, selectedGroupId, setSelectedGroupId, currentUser, logoutUser } = useChat();
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>💬 Chat</h2>
        <div className="user-profile">
          <span className="avatar-small">{currentUser?.avatar}</span>
          <span className="user-name-small">{currentUser?.name}</span>
        </div>
      </div>

      <div className="sidebar-actions">
        <button className="create-group-btn" onClick={() => setShowCreateModal(true)}>
          ➕ New Group
        </button>
        <button className="logout-btn" onClick={logoutUser}>
          🚪 Logout
        </button>
      </div>

      <div className="groups-list">
        <h3>Groups</h3>
        {groups.length === 0 ? (
          <p className="empty-message">No groups yet</p>
        ) : (
          groups.map((group) => (
            <div
              key={group.id}
              className={`group-item ${selectedGroupId === group.id ? 'active' : ''}`}
              onClick={() => setSelectedGroupId(group.id)}
            >
              <div className="group-icon">👥</div>
              <div className="group-info">
                <div className="group-name">{group.name}</div>
                <div className="group-member-count">{group.members.length} members</div>
              </div>
              {selectedGroupId === group.id && <div className="active-indicator">•</div>}
            </div>
          ))
        )}
      </div>

      {showCreateModal && <CreateGroupModal onClose={() => setShowCreateModal(false)} />}
    </div>
  );
}

export default Sidebar;
