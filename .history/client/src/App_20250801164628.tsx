import { useEffect, useState } from 'react';
import { socket } from './socket';
import './App.css'

interface User{
  id: string;
  name: string;
  password: string;
}
interface Message{
  id: string;
  text: string;
  user: User;
}
interface ChatRoom{
  id: string;
  users: User[];
  messages: Message[];
}

function App() {
 return (
   <>
   </>
 )
  
}

export default App
