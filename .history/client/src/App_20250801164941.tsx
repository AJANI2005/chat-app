import { useEffect, useState } from 'react';
import { socket } from './socket';
import './App.css'

const Login = ()=>{
  return (
     <form>
        <input type='text' placeholder='username' />
     </form>
  )
}

function App() {
 return (
   <>
    <Login />
   </>
 )
  
}

export default App
