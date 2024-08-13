import { useState } from 'react';
import './App.css';
import Login from './Components/Login';
import RegistrationForm from './Components/RegistrationForm';

function App() {
  const [isReg, setIsReg] = useState(true);

  return (
    <div className="App">
      {isReg ? <RegistrationForm /> : <Login />}
      <div className="switch-text" onClick={() => setIsReg(!isReg)}>
        {isReg ? ' Registered ? Go to Login' : 'If not Registered? Go to Register'}
      </div>
    </div>
  );
}

export default App;