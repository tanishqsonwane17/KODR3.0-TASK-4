import { useState } from 'react';
import { useChat } from '../context/useChat';
import '../styles/Login.css';

function Login() {
  const { users, loginUser } = useChat();
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleLogin = () => {
    if (selectedUserId) {
      loginUser(selectedUserId);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1> Group Chat</h1>
        <p className="subtitle">Select a user to login</p>

        <div className="users-grid">
          {users.map((user) => (
            <div
              key={user.id}
              className={`user-option ${selectedUserId === user.id ? 'selected' : ''}`}
              onClick={() => setSelectedUserId(user.id)}
            >
              <div className="avatar">{user.avatar}</div>
              <div className="user-name">{user.name}</div>
              <div className={`status ${user.status}`}>{user.status}</div>
            </div>
          ))}
        </div>

        <button
          className="login-btn"
          onClick={handleLogin}
          disabled={!selectedUserId}
        >
          Login as {users.find((u) => u.id === selectedUserId)?.name || 'User'}
        </button>
      </div>
    </div>
  );
}

export default Login;
