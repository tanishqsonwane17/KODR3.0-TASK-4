import { useState } from 'react';
import { useChat } from '../context/useChat';
import '../styles/MessageInput.css';

function MessageInput({ groupId }) {
  const { sendMessage } = useChat();
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = () => {
    if (messageText.trim()) {
      sendMessage(groupId, messageText);
      setMessageText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="message-input">
      <textarea
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message... (Shift+Enter for new line)"
        rows="3"
      />
      <button onClick={handleSendMessage} disabled={!messageText.trim()}>
        📤 Send
      </button>
    </div>
  );
}

export default MessageInput;
