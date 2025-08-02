import { useEffect, useState } from 'react';
import { socket } from './socket';
import './App.css';
import './style/login.css';
import './style/chat.css';
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
  const [users, setUsers] = useState<User[]>([])


  const [room, setRoom] = useState<ChatRoom | undefined>()
  const [message, setMessage] = useState<string>("")

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
    } catch (err) {
      console.error(err);
    }
  };

  const onLogout = () => {
    setUser(undefined);
    window.location.reload();
  }
 
  const joinRoom = (other : User) => {
    socket.emit("joinRoom", { user: user, other: other })
  }
  const sendMessage = () => {
    if (!message) return
    socket.emit("sendMessage", { user: user, message: message })
    setMessage("")
  } 
  
  // On page load
  useEffect(() => {
    // Load users
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => { setUsers(data.users); })
      .catch((err) => console.error(err));

  }, []);

  // socket methods 
  useEffect(() => {
    // Check connection
    socket.on("connect", () => {
      console.log(socket.id)
      console.log("Connected to server")
    })
    // Join room
    socket.on("roomJoined", (room : ChatRoom) => {
      console.log("Joined room")
      console.log(room)
      setRoom(room)
    })
  }, [])


  return (
    <div className="app">
      {!user && <Login onLogin={onLogin} />}

      {/*Chat*/}
      {user &&
        <>
          <div className="chat-container">
            {
              room && <div className="chat">
                <div className="chat-header">
                  <div>
                    {/* other users */}
                    {
                      room.userIds.map((id) => {
                        const _user = users.find((u) => u.id == id)
                        if (!_user || _user.id == user.id) return
                        return (
                          <div className="user" key={_user.id}>
                            <p className="username">{_user.name}</p>
                          </div>
                        )
                      })
                    }
                  </div>
                  <div>
                    <p className="username">{user.name}</p>
                    <button onClick={onLogout}>Logout</button>
                  </div>
                </div>
                <div className="chat-body">
                  <div className="chat-messages"></div>
                </div>
                <div className="chat-footer">
                  <input 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      type="text" placeholder="Type a message..." />
                  <button onClick={sendMessage}>Send</button>
                </div>
              </div>
            }
            <div className="user-list">
              <h3>Users</h3>
              {
                users.map((_user) => {
                  if (user.id == _user.id) return
                  return (
                    <div className="user" key={_user.id}>
                      <button className="username" onClick={() => joinRoom(_user)}>{_user.name}</button>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </>}
    </div>
  )

}


export default App
