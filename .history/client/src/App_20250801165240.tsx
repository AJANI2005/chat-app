import { useEffect, useState } from 'react';
import { socket } from './socket';
import './App.css'

const Login = ()=>{
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
			<div className="forgot">
				<a rel="noopener noreferrer" href="#">Forgot Password ?</a>
			</div>
		</div>
		<button className="sign">Sign in</button>
	</form>
	<div className="social-message">
		<div className="line"></div>
		<p className="message">Login with social accounts</p>
		<div className="line"></div>
	</div>
	
	<p className="signup">Don't have an account?
		<a rel="noopener noreferrer" href="#" className="">Sign up</a>
	</p>
</div> 
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
