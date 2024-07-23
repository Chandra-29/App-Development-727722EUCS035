import React, { useState } from 'react'
import './styles.css';

const Login = () => {
    const[username,setUsername]=useState('');
    const[password,setPassword]=useState('');

    const handlSubmit=(event)=>{
        event.preventDefault();
        alert(`Register with username: ${username} and password: ${password}`)
        setUsername('');
        setPassword('');
    }

  return (
    <div>
        <h2>Login</h2>
        <form onSubmit={handlSubmit}>
            <div>
                <label>USERNAME</label>
                <input type="text"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                required
                />
            </div>
            <div>
                <label>PASSWORD</label>
                <input type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
  );
};

export default Login;