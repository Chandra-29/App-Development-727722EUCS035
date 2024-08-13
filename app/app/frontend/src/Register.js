// src/Register.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';  // Import axios for HTTP requests
import './Auth.css';
import chess from './asserts/chess video.mp4';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan } = location.state;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Send the registration details to the backend
      await axios.post('http://localhost:8080/api/plans', {
        plan,
        name,
        email,
        password,
      });

      // Navigate to the payment page or show a success message
      navigate('/payment', { state: { plan, name, email } });
    } catch (error) {
      console.error('There was an error registering!', error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className='video-background'>
      <video src={chess} autoPlay loop muted id='background'></video>
      <div className="auth-container">
        <h2>Register</h2>
        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="plan">Selected Plan:</label>
            <input
              type="text"
              id="plan"
              value={plan}
              readOnly
            />
          </div>
          <button type="submit" className="cta-button">Register</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
