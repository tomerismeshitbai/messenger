
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3001;


let chats = [
  { id: 1, name: 'React 2023' },
  { id: 2, name: 'KBTU 21BD' },
  { id: 3, name: 'FCTG' },
];

const messages = {
  1: [
    { id: 1, sender: 'Bermagambet Duisek', text: 'A great day for offline attendance ' },
    { id: 2, sender: 'Bermagambet Duisek', text: 'Overall, points are decent 🎉🎉🎉' },
  ],
  2: [
    { id: 1, sender: 'Ainur', text: 'Hey!' },
    { id: 2, sender: 'Madina', text: 'Hi,21BD!' },
  ],
  3: [],
};

app.use(cors());
app.use(bodyParser.json());

app.get('/chats', (req, res) => {
  res.json({ chats });
});

app.get('/messages/:chatId', (req, res) => {
  const chatId = req.params.chatId;
  res.json({ messages: messages[chatId] || [] });
});

app.post('/messages/:chatId', (req, res) => {
  const chatId = req.params.chatId;
  const newMessage = req.body;

  if (!messages[chatId]) {
    messages[chatId] = [];
  }

  newMessage.id = messages[chatId].length + 1;
  messages[chatId].push(newMessage);

  res.json({ message: 'Message sent successfully' });
});

app.post('/chats', (req, res) => {
  const newChatName = req.body.name;
  const newChat = { id: chats.length + 1, name: newChatName };
  chats.push(newChat);

  res.json({ chats });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
