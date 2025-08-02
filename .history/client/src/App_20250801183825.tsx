import { useEffect, useState } from 'react';
import { socket } from './socket';
import './App.css';
import './style/login.css';
import type { User } from './types';

interface LoginProps {
  onLogin: (user: User) => void
}
const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      return
    }
    onLogin({ id: "xxx", name: username, password: password })
  }

  return (
    <div className="form-container">
      <p className="title">Login</p>
      <form className="form">
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text" name="username" id="username" placeholder="" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password" name="password" id="password" placeholder="" />
        </div>
        <button className="sign" onClick={onSubmit}>Sign in</button>
      </form>

    </div>
  )
}

function App() {

  const [user, setUser] = useState<User | undefined>()

  const onLogin = async (user: User) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      // Save user in state (or localStorage for persistence)
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user)); // optional
    } catch (err) {
      console.error(err);
    }
  };

  // check for user
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // DEBUG
  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id)
      console.log("Connected to server")
    })
  }, [])


  return (
    <div className="app">
      {!user && <Login onLogin={onLogin} />}
    </div>
  )

}


export default App
