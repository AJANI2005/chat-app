import { useEffect, useState } from 'react';
import './App.css'
import { io } from 'socket.io-client';


function App() {

  // Chat App using socket.io
  const server = 'http://localhost:5000';
  const socket = io(server);

  return (
    <>
      <h1>Hello World</h1> 
      {socket.id}
    </>
  )
}

export default App
