import { useEffect, useState } from 'react';
import { socket } from './socket';
import './App.css';
import './style/login.css';
import type { ChatRoom, User } from './types';

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
    onLogin({ id: "0", name: username, password: password })
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
  const [users, setUsers] = useState<User[]>([])
  const [chatRoom, setChatRoom] = useState<ChatRoom | undefined>()
  const [message, setMessage] = useState("")
  


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

      // Save user 
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (err) {
      console.error(err);
    }
  };
  const onLogout = () => {
    setUser(undefined);
    localStorage.removeItem("user");
    window.location.reload();
  }


  const sendMessage = () => {
  }




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

      {/*Chat*/}
      {user && <div className="chat-container">
        {/* Sidebar */}
        <div className="user-list">
          <h3>Users</h3>
          <ul>
            {users.map((u) => (
              <li key={u.id}>{u.name}</li>
            ))}
          </ul>
        </div>

        {/* Chat Section */}
        <div className="chat">
          <div className="chat-header">
            <span>Chat Room</span>
            <button onClick={onLogout}>Logout</button>
          </div>

          <div className="chat-messages">
            {chatRoom?.messages.map((msg, index) => (
              <div key={index} className="message">
                <strong>{msg.user.name}:</strong> {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>}
    </div>
  )

}


export default App
