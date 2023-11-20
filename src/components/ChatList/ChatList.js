import React, { useState } from 'react';
import './ChatList.css';

const ChatList = ({ chats, onSelectChat, onCreateChat }) => {
  const [newChatName, setNewChatName] = useState('');

  const handleCreateChat = () => {
    if (newChatName.trim() !== '') {
      onCreateChat(newChatName);
      setNewChatName('');
    }
  };

  return (
    <div className="chat-list">
      <div>
        <input
          type="text"
          placeholder="Enter new chat name"
          value={newChatName}
          onChange={(e) => setNewChatName(e.target.value)}
        />
        <button onClick={handleCreateChat}>Create Chat</button>
      </div>
      {chats.map((chat) => (
        <div key={chat.id} className="chat" onClick={() => onSelectChat(chat)}>
          {chat.name}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
