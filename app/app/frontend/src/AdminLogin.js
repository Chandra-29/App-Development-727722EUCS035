// src/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the Auth context
import './Auth.css';
import chess from './asserts/chess video.mp4';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function from Auth context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const ADMIN_EMAIL = 'admin@example.com'; // Define constant admin email
  const ADMIN_PASSWORD = 'admin123'; // Define constant admin password

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if email and password match the constant values
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      login(); // Update the auth state to logged in
      navigate('/admin'); // Navigate to admin dashboard
    } else {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className='video-background'>
      <video src={chess} autoPlay loop muted id='background'></video>
      <div className="auth-container">
        <h2>Admin Login</h2>
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Admin Email:</label>
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
      </div>
    </div>
  );
};

export default AdminLogin;
