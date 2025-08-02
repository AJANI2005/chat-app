import { useEffect, useState } from 'react';
import { socket } from './socket';

import './App.css'

interface Message {
  sender: string;
  message: string;
  time : Date;
} 


function App() {

  // Chat App using socket.io
  const [message, setMessage] = useState<string | undefined>(""); 
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket ID:', socket.id);
      console.log('Connected to server');
    });
  }, []);

  const sendMessage = (e : React.FormEvent) => {
    e.preventDefault();
    // send message to server
  }
  return (
    <>
      <h1>Chat App</h1>
      <form onSubmit={sendMessage}>
        <input type="text" onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
      <div>
        { ( messages.length && messages.map((message, index) => (
          <div>
            <p>{message.time.toUTCString()}</p>
            <p key={index}>{message.sender}: {message.message}</p>
          </div>
        ))) || <p>Messages will appear here</p>}
      </div>
    </>
  )
}

export default App
