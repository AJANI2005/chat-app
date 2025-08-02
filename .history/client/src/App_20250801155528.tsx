import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import './App.css'

interface Message {
  sender: string;
  message: string;
} 


function App() {

  // Chat App using socket.io
  const [socketID, setSocketID] = useState<string | undefined>("");
  const [message, setMessage] = useState<string | undefined>(""); 
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const server = 'http://localhost:5000';
    const socket = io(server);

    socket.on('connect', () => {
      console.log('Socket ID:', socket.id);
      console.log('Connected to server');
      setSocketID(socket.id)
    });

    return () => {
      socket.disconnect();
    }
  }, []);

  return (
    <>
      <h1>Chat App</h1>
      <p>Socket ID: {socketID}</p>
      <form>
        <input type="text" onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
      <div>
        { ( messages.length && messages.map((message, index) => (
          <p key={index}>{message.sender}: {message.message}</p>
        ))) || <p>Messages will appear here</p>}
      </div>
    </>
  )
}

export default App
