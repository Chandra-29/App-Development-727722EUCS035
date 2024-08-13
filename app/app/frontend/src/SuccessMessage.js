// src/SuccessMessage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SuccessMessage.css';

const SuccessMessage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000); // Redirect to home page after 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-message">
      <h2>Payment Successful!</h2>
      <p>You will be redirected to the home page shortly.</p>
    </div>
  );
};

export default SuccessMessage;
