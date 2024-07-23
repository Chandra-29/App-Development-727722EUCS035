import logo from './logo.svg';
import './App.css';
import RegisterForm from './Components/Register';
import Login from './Components/Login';
import { useState } from 'react';

function App() {
   const[isRegister,setIsRegister]=useState(true)

  return (
    <div className="App">
      <button onClick={()=>setIsRegister(!isRegister)}>
      {isRegister ? 'switch to login ':'Switch to Register' }
      </button>
      {
        isRegister? <RegisterForm/>:<Login/>
      }
    </div>
  );
}

export default App;
