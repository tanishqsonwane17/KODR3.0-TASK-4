import { useState } from 'react';
import { ChatContext } from './ChatContextSetup';

export const ChatProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice', avatar: '👩‍💻', status: 'online' },
    { id: 2, name: 'Bob', avatar: '👨‍💻', status: 'online' },
    { id: 3, name: 'Charlie', avatar: '👨‍🎨', status: 'offline' },
    { id: 4, name: 'Diana', avatar: '👩‍🔬', status: 'online' },
  ]);

  const [currentUser, setCurrentUser] = useState(null);
  
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: 'General',
      description: 'General discussions',
      members: [1, 2, 3, 4],
      createdBy: 1,
      messages: [
        { id: 1, userId: 1, username: 'Alice', text: 'Hey everyone!', timestamp: '10:30 AM' },
        { id: 2, userId: 2, username: 'Bob', text: 'Hi Alice!', timestamp: '10:31 AM' },
      ],
    },
    {
      id: 2,
      name: 'React Dev',
      description: 'React development team',
      members: [1, 2],
      createdBy: 2,
      messages: [
        { id: 1, userId: 2, username: 'Bob', text: 'Working on Context API', timestamp: '09:15 AM' },
      ],
    },
  ]);

  const [selectedGroupId, setSelectedGroupId] = useState(1);
  const [notifications, setNotifications] = useState([]);

  // User methods
  const loginUser = (userId) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === userId ? { ...u, status: 'online' } : u
        )
      );
    }
  };

  const logoutUser = () => {
    if (currentUser) {
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === currentUser.id ? { ...u, status: 'offline' } : u
        )
      );
    }
    setCurrentUser(null);
  };

  const updateUserStatus = (userId, status) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === userId ? { ...u, status } : u
      )
    );
  };

  // Group methods
  const sendMessage = (groupId, text) => {
    if (!text.trim()) return;

    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id === groupId) {
          const newMessage = {
            id: group.messages.length + 1,
            userId: currentUser.id,
            username: currentUser.name,
            text,
            timestamp: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            }),
          };
          return {
            ...group,
            messages: [...group.messages, newMessage],
          };
        }
        return group;
      })
    );

    // Add notification
    addNotification(`${currentUser.name} sent a message in ${groups.find((g) => g.id === groupId)?.name}`);
  };

  const createGroup = (name, description, memberIds) => {
    const newGroup = {
      id: Math.max(...groups.map((g) => g.id), 0) + 1,
      name,
      description,
      members: memberIds,
      createdBy: currentUser.id,
      messages: [],
    };
    setGroups((prevGroups) => [...prevGroups, newGroup]);
    addNotification(`Group "${name}" created successfully`);
    return newGroup.id;
  };

  const addMembersToGroup = (groupId, memberIds) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            members: [...new Set([...group.members, ...memberIds])],
          };
        }
        return group;
      })
    );
    addNotification(`Members added to group`);
  };

  const removeMemberFromGroup = (groupId, memberId) => {
    setGroups((prevGroups) =>
      prevGroups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            members: group.members.filter((id) => id !== memberId),
          };
        }
        return group;
      })
    );
  };

  const deleteGroup = (groupId) => {
    setGroups((prevGroups) => prevGroups.filter((g) => g.id !== groupId));
    if (selectedGroupId === groupId) {
      setSelectedGroupId(groups[0]?.id || null);
    }
    addNotification('Group deleted');
  };

  // Notification methods
  const addNotification = (message) => {
    const notification = {
      id: Date.now(),
      message,
      timestamp: new Date().toLocaleTimeString(),
    };
    setNotifications((prev) => [notification, ...prev].slice(0, 10));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const value = {
    users,
    currentUser,
    loginUser,
    logoutUser,
    updateUserStatus,
    groups,
    selectedGroupId,
    setSelectedGroupId,
    sendMessage,
    createGroup,
    addMembersToGroup,
    removeMemberFromGroup,
    deleteGroup,
    notifications,
    addNotification,
    clearNotifications,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
