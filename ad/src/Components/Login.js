import React, { useState } from 'react'
import './Login.css';
const Login = () => {

       
    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');

    const handleSubmit =(event)=>
    {
        event.preventDefault();
        alert(`Registerd with username: ${username} and password: ${password}`)
        setusername('');
        setpassword('');
    }


  return (
    <div className='log'>
        <div className='box'>
        <form onSubmit={handleSubmit}>
    <table>
         <h1>Login</h1>
        <tr></tr>
          <td>Username</td>
          <td>
          <input type='email'
          value={username}
          onChange={(e)=>setusername(e.target.value)}
          required
          ></input>
          </td>
          <tr></tr>
          <td>Password:</td>
          <td>
          <input 
          type='password'
          value={password}
          onChange={(e)=>setpassword(e.target.value)}
          required>
          </input>
          </td>
          <tr></tr>
          <button>Submit</button>
       </table>
    </form>
</div>
    
   
</div>
  )
}

export default Login
