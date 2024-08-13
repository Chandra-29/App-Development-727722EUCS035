// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from './AuthContext'; // Import useAuth
import './Auth.css';
import chess from './asserts/chess video.mp4';


const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { login } = useAuth(); // Get login function from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Simulate admin login
    const isAdmin = email === 'admin@example.com' && password === 'admin123'; // Example admin credentials

    if (isAdmin) {
      login({ id: 1, name: 'Admin User', role: 'admin' }); // Set admin user
      navigate('/admin'); // Redirect to admin dashboard
    } else {
      // Handle regular user login (you can add your logic here)
      login({ id: 2, name: 'Regular User', role: 'user' }); // Example regular user
      navigate('/'); // Redirect to home or user dashboard
    }
  };

  return (
    <div className='video-background'>
    <video src={chess} autoPlay loop muted id='background'></video>

    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="cta-button4">Login</button>
      </form>
      <p className="toggle-auth" onClick={() => navigate('/signUp')}>
        Don't have an account? Sign Up
      </p>
    </div>
    </div>
  );
};

export default Login;