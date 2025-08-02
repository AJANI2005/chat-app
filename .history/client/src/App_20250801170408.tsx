import { useEffect, useState } from 'react';
import { socket } from './socket';
import './App.css';
import './style/login.css';
import type { User } from './types';

interface LoginProps{
  onLogin: (user : User) => void
}
const Login : React.FC<LoginProps> = ({onLogin}) => {
  const onSubmit = (e : React.FormEvent) => {
    e.preventDefault();
  }
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
        <button className="sign" onClick={onSubmit}>Sign in</button>
      </form>
    
    </div>
  )
}

function App() {

  const [user,setUser] = useState<User | undefined>()

  const onLogin = (user : User) => {
    
  }


  return (
    <div className="app">
      <Login onLogin={onLogin}/>
    </div>
  )

}

export default App
