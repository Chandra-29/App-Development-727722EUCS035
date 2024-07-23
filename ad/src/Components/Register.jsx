import React, { useState } from 'react'
import './Register.css'
const RegisterForm = () => {
     
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
        <form onSubmit={handleSubmit}>
        <table>
             <h1>Register</h1>
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
  )
}

export default RegisterForm