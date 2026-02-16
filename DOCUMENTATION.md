# 💬 Group Chat Application

An intermediate-level React application built with Context API for state management. This project demonstrates core React concepts with a clean, functional chat interface.

## Features

✅ **User Authentication** - Login with different user profiles  
✅ **Group Management** - Create, view, and manage chat groups  
✅ **Real-time Messaging** - Send and receive messages within groups  
✅ **User Status** - Track online/offline status  
✅ **Group Info Panel** - View members and group details  
✅ **Notifications System** - Real-time activity notifications  
✅ **Responsive UI** - Clean and intuitive interface  
✅ **Member Management** - Add/remove members from groups (admin only)  

## Tech Stack

- **React 19.2.0** - UI framework
- **Context API** - State management (no Redux, useCallback, useMemo, or React.memo)
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern features

## Project Structure

```
src/
├── components/
│   ├── Login.jsx              # User login interface
│   ├── Sidebar.jsx            # Groups sidebar
│   ├── ChatWindow.jsx         # Main chat area
│   ├── MessageList.jsx        # Message display
│   ├── MessageInput.jsx       # Message input field
│   ├── CreateGroupModal.jsx   # Group creation modal
│   ├── GroupInfo.jsx          # Group information panel
│   └── Notifications.jsx      # Notifications panel
├── context/
│   ├── ChatContextSetup.js    # Context creation
│   ├── ChatContext.jsx        # Provider component
│   └── useChat.js             # Custom hook
├── styles/
│   ├── Login.css
│   ├── Sidebar.css
│   ├── ChatWindow.css
│   ├── MessageList.css
│   ├── MessageInput.css
│   ├── CreateGroupModal.css
│   ├── GroupInfo.css
│   └── Notifications.css
├── App.jsx                    # Root component
├── App.css                    # App styles
├── index.css                  # Global styles
└── main.jsx                   # Entry point
```

## Context API Structure

### ChatContext Value Object

```javascript
{
  // User Management
  users,                    // Array of all users
  currentUser,             // Currently logged-in user
  loginUser(userId),       // Login a user
  logoutUser(),            // Logout current user
  updateUserStatus(userId, status),  // Update user status
  
  // Group Management
  groups,                  // Array of all groups
  selectedGroupId,         // Currently selected group
  setSelectedGroupId(id),  // Select a group
  sendMessage(groupId, text),  // Send message to group
  createGroup(name, desc, memberIds),  // Create new group
  addMembersToGroup(groupId, memberIds),  // Add members
  removeMemberFromGroup(groupId, memberId),  // Remove member
  deleteGroup(groupId),    // Delete group
  
  // Notifications
  notifications,           // Array of notifications
  addNotification(message),  // Add notification
  clearNotifications(),    // Clear all notifications
}
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5175` (or the port shown in terminal)

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## How to Use

### 1. **Login**
   - Select a user from the login screen (Alice, Bob, Charlie, or Diana)
   - Click "Login as [User]" button

### 2. **Create a Group**
   - Click "➕ New Group" button in sidebar
   - Enter group name and description
   - Select members to add
   - Click "Create Group"

### 3. **Send Messages**
   - Select a group from sidebar
   - Type your message in the input area
   - Press Enter or click "📤 Send" button
   - Use Shift+Enter for new lines

### 4. **View Group Info**
   - Click "ℹ️" button in chat header
   - See member list and group details
   - (Admin only) Remove members or delete group

### 5. **Logout**
   - Click "🚪 Logout" in sidebar
   - You'll be redirected to login screen

## Key Concepts Demonstrated

### Context API Usage
- Single context for global state management
- Provider pattern for state distribution
- Custom hook (`useChat`) for easy consumption
- State updates through context value methods

### Component Structure
- Functional components with hooks
- No optimization techniques (no React.memo, useCallback, or useMemo)
- Props passing for component communication
- Proper separation of concerns

### State Management
- User authentication state
- Group and message data
- Real-time notifications
- User status tracking

### Styling
- CSS modules organization
- Responsive design
- Smooth animations and transitions
- Custom scrollbar styling

## Sample Data

The app comes with pre-configured sample data:

**Users:**
- Alice (👩‍💻) - Online
- Bob (👨‍💻) - Online
- Charlie (👨‍🎨) - Offline
- Diana (👩‍🔬) - Online

**Groups:**
- General (4 members)
- React Dev (2 members)

## Browser Support

Works on all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Learning Resources

This project is perfect for learning:
- React Context API fundamentals
- Building applications with hooks
- Component composition and reusability
- State management patterns
- CSS-in-practice styling
- Building functional UIs

## Code Quality

- Clean, readable code with proper naming conventions
- No complex optimizations (keeping it beginner-friendly)
- Well-organized component and style files
- Clear separation of concerns
- Proper error handling

## License

MIT License - feel free to use this project as a learning resource.

---

**Happy Coding! 🚀**
