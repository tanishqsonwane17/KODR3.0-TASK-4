import { useState } from 'react';
import { useChat } from '../context/useChat';
import '../styles/GroupInfo.css';

function GroupInfo({ group, members, onClose }) {
  const { removeMemberFromGroup, deleteGroup, setSelectedGroupId } = useChat();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const isGroupAdmin = group.createdBy === members[0]?.id;

  const handleRemoveMember = (memberId) => {
    if (memberId !== group.createdBy) {
      removeMemberFromGroup(group.id, memberId);
    }
  };

  const handleDeleteGroup = () => {
    deleteGroup(group.id);
    setSelectedGroupId(null);
    onClose();
  };

  return (
    <div className="group-info-panel">
      <div className="info-header">
        <h3>{group.name}</h3>
        <button className="close-info-btn" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="info-section">
        <p className="description">{group.description}</p>
      </div>

      <div className="info-section">
        <h4>Members ({members.length})</h4>
        <div className="members-info">
          {members.map((member) => (
            <div key={member.id} className="member-info-item">
              <div className="member-badge">
                <span className="avatar">{member.avatar}</span>
                <span className={`status-dot ${member.status}`}></span>
              </div>
              <div className="member-details">
                <span className="member-name">{member.name}</span>
                <span className="member-status">{member.status}</span>
              </div>
              {isGroupAdmin && member.id !== group.createdBy && (
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveMember(member.id)}
                  title="Remove member"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {isGroupAdmin && (
        <div className="info-actions">
          <button className="danger-btn" onClick={() => setShowDeleteConfirm(true)}>
            🗑️ Delete Group
          </button>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="confirm-dialog">
          <p>Are you sure you want to delete this group? This action cannot be undone.</p>
          <div className="dialog-buttons">
            <button className="cancel-btn" onClick={() => setShowDeleteConfirm(false)}>
              Cancel
            </button>
            <button className="danger-btn" onClick={handleDeleteGroup}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GroupInfo;
