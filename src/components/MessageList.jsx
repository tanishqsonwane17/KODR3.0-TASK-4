import '../styles/MessageList.css';

function MessageList({ messages, users }) {
  const getAvatar = (userId) => {
    return users.find((u) => u.id === userId)?.avatar || '👤';
  };

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div className="empty-messages">
          <p>No messages yet. Start the conversation! 👋</p>
        </div>
      ) : (
        messages.map((message) => (
          <div key={message.id} className="message-item">
            <div className="message-avatar">{getAvatar(message.userId)}</div>
            <div className="message-content">
              <div className="message-header">
                <span className="message-author">{message.username}</span>
                <span className="message-time">{message.timestamp}</span>
              </div>
              <div className="message-text">{message.text}</div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MessageList;
