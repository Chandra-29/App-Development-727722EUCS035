// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './api/axios'; // Import the Axios instance
import { useAuth } from './AuthContext'; // Import the Auth context
import './Auth.css';
import chess from './asserts/chess video.mp4';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from Auth context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', {
        email,
        password
      });

      // Assuming the response contains a token or user role
      if (response.data.role === 'admin') {
        login(); // Update the auth state to logged in
        navigate('/admin');
      } else {
        login(); // Update the auth state to logged in
        navigate('/');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
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
          {error && <p className="error-message">{error}</p>}
        </form>
        <p className="toggle-auth" onClick={() => navigate('/signUp')}>
          Don't have an account? Sign Up
        </p>
        <p className="toggle-auth" onClick={() => navigate('/adminlogin')}>
          Login as Admin
        </p>
      </div>
    </div>
  );
};

export default Login;
