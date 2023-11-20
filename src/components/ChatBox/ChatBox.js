import React from 'react';
import './ChatBox.css';

const ChatBox = ({ selectedChat, messages, onSendMessage, newMessage, onMessageChange }) => {
  return (
    <div className="chat-box">
      <div className="chat-header">{selectedChat && selectedChat.name}</div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <strong>{message.sender}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => onMessageChange(e.target.value)}
        />
        <button onClick={onSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
