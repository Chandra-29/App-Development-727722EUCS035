import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './api/axios'; // Import the Axios instance
import './Auth.css';
import chess from './asserts/chess video.mp4';

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/register', {
        firstName,
        lastName,
        email,
        password
      });
      console.log(response.data); // Log response data for debugging
      navigate('/login');
    } catch (err) {
      console.error('Error details:', err.response); // Log the error response for detailed information
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className='video-background'>
      <video src={chess} autoPlay loop muted id='background'></video>
      <div className="auth-container">
        <h2>Sign Up</h2>
        <form className="auth-form" onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
          <button type="submit" className="cta-button4">Sign Up</button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <p className="toggle-auth" onClick={() => navigate('/login')}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
};

export default Signup;
