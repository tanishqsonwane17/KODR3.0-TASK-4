import { ChatProvider } from './context/ChatContext';
import { useChat } from './context/useChat';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import Notifications from './components/Notifications';
import './App.css';

function Main() {
  const { currentUser } = useChat();

  return currentUser ? (
    <div className="app-layout">
      <Sidebar />
      <ChatWindow />
      <Notifications />
    </div>
  ) : (
    <Login />

  );
}

export default function App() {
  return (
    <ChatProvider>
      <Main />
    </ChatProvider>
  );
}
