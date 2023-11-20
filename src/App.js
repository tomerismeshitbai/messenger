import React, { useState, useEffect } from 'react';
import './App.css';
import ChatList from './components/ChatList/ChatList';
import ChatBox from './components/ChatBox/ChatBox';

const API_URL = 'http://localhost:3001'; 

function App() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat.id);
    }
  }, [selectedChat]);

  const fetchChats = async () => {
    try {
      const response = await fetch(`${API_URL}/chats`);
      const data = await response.json();
      setChats(data.chats);
      if (data.chats.length > 0) {
        setSelectedChat(data.chats[0]);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      const response = await fetch(`${API_URL}/messages/${chatId}`);
      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async () => {
    try {
      await fetch(`${API_URL}/messages/${selectedChat.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newMessage }),
      });
      fetchMessages(selectedChat.id);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const createChat = async (newChatName) => {
    try {
      const response = await fetch(`${API_URL}/chats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newChatName }),
      });
      const data = await response.json();
      setChats(data.chats);
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  return (
    <div className="app">
      <ChatList chats={chats} onSelectChat={setSelectedChat} onCreateChat={createChat} />
      <ChatBox
        selectedChat={selectedChat}
        messages={messages}
        onSendMessage={sendMessage}
        newMessage={newMessage}
        onMessageChange={setNewMessage}
      />
    </div>
  );
}

export default App;
