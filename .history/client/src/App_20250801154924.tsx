import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import './App.css'

function App() {


  // Chat App using socket.io
  const [socketID, setSocketID] = useState("")
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
  },[]);

  return (
    <>
      <h1>Hello World</h1>
      <p>{socketID}</p>
    </>
  )
}

export default App
