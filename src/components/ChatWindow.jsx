import { useState } from 'react';
import { useChat } from '../context/useChat';
import '../styles/ChatWindow.css';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import GroupInfo from './GroupInfo';

function ChatWindow() {
  const { groups, selectedGroupId, users } = useChat();
  const [showGroupInfo, setShowGroupInfo] = useState(false);

  const selectedGroup = groups.find((g) => g.id === selectedGroupId);

  if (!selectedGroup) {
    return <div className="chat-window empty">Select a group to start chatting</div>;
  }

  const groupMembers = users.filter((u) => selectedGroup.members.includes(u.id));

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-header-info">
          <h2>{selectedGroup.name}</h2>
          <p>{selectedGroup.description}</p>
        </div>
        <button
          className="group-info-btn"
          onClick={() => setShowGroupInfo(!showGroupInfo)}
          title="Group info"
        >
          ℹ️
        </button>
      </div>

      {showGroupInfo && <GroupInfo group={selectedGroup} members={groupMembers} onClose={() => setShowGroupInfo(false)} />}

      <MessageList messages={selectedGroup.messages} users={users} />

      <MessageInput groupId={selectedGroup.id} />
    </div>
  );
}

export default ChatWindow;
