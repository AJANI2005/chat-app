import { useEffect, useState } from 'react';
import { socket } from './socket';
import './App.css';
import './style/login.css';

interface LoginProps{
  onLogin: () => void
}
const Login : React.FC<LoginProps> = ({onLogin}) => {
  return (
    <div className="form-container">
      <p className="title">Login</p>
      <form className="form">
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" placeholder="" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" placeholder="" />
        </div>
        <button className="sign" onClick={onLogin}>Sign in</button>
      </form>
    
    </div>
  )
}

function App() {
  return (
    <div className="app">
      <Login onLogin={}/>
    </div>
  )

}

export default App
