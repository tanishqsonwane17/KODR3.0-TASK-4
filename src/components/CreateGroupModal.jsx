import { useState } from 'react';
import { useChat } from '../context/useChat';
import '../styles/CreateGroupModal.css';

function CreateGroupModal({ onClose }) {
  const { users, currentUser, createGroup } = useChat();
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([currentUser.id]);

  const handleMemberToggle = (userId) => {
    setSelectedMembers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleCreateGroup = () => {
    if (groupName.trim() && selectedMembers.length > 0) {
      createGroup(groupName, description, selectedMembers);
      onClose();
    }
  };

  const otherUsers = users.filter((u) => u.id !== currentUser.id);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Group</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Group Name *</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Enter group name"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter group description (optional)"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Add Members</label>
            <div className="members-list">
              <div className="member-item selected-member">
                <input type="checkbox" checked disabled />
                <span>{currentUser.avatar} {currentUser.name} (You)</span>
              </div>
              {otherUsers.map((user) => (
                <div key={user.id} className="member-item">
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(user.id)}
                    onChange={() => handleMemberToggle(user.id)}
                  />
                  <span>
                    {user.avatar} {user.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            className="create-btn"
            onClick={handleCreateGroup}
            disabled={!groupName.trim()}
          >
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateGroupModal;
