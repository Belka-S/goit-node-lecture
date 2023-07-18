import { useState, useCallback, useEffect } from 'react';
import io from 'socket.io-client';
import { nanoid } from 'nanoid';

import { NameForm } from './components/NameForm';
import { ChatForm } from './components/ChatForm';
import { Chat } from './components/Chat';

const socket = io.connect('http://localhost:3001');

function App() {
  const [nickName, setNickName] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('chat-message', message => {
      const newMessage = { ...message, type: 'userMessage' };
      setMessages(prevState => [newMessage, ...prevState]);
    });
  }, []);

  const addNickName = useCallback(({ nickName }) => setNickName(nickName), []);
  const addMessage = useCallback(
    ({ message }) => {
      const newMessage = { nickName, id: nanoid(), type: 'yourMessage', message };
      setMessages(prevState => [newMessage, ...prevState]);
      socket.emit('chat-message', newMessage);
    },
    [nickName],
  );

  return (
    <div>
      {!nickName && <NameForm onSubmit={addNickName} />}
      {nickName && <ChatForm onSubmit={addMessage} />}
      {nickName && <Chat items={messages} />}
    </div>
  );
}

export default App;
