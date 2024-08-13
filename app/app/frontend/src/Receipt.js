// src/Receipt.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import './Receipt.css';

const Receipt = () => {
  const location = useLocation();
  const { plan, name, email, cardNumber, expiryDate, cvv, nameOnCard } = location.state || {}; // Extract state from location

  // Get today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="receipt">
      <h2>Receipt</h2>
      <p><strong>Date:</strong> {formattedDate}</p>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Selected Plan:</strong> {plan}</p>
      <p><strong>Card Number:</strong> {cardNumber}</p>
      <p><strong>Expiry Date:</strong> {expiryDate}</p>
      {/* <p><strong>CVV:</strong> {cvv}</p> */}
      <p><strong>Name on Card:</strong> {nameOnCard}</p>
      <p><strong>Thank you for your payment!</strong></p>
    </div>
  );
};

export default Receipt;
