import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './PaymentForm.css';

const PaymentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan, name, email } = location.state || {};

  const [formData, setFormData] = useState({
    name: name || '',
    email: email || '',
    plan: plan || 'Basic', // Default plan if none provided
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    pass: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // State for success message

  useEffect(() => {
    if (plan) {
      setFormData(prevData => ({ ...prevData, plan }));
    }
  }, [plan]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.cardNumber.length !== 16) {
      setError('Card number must be exactly 16 digits.');
      return;
    }

    setLoading(true);
    setError(''); // Clear any previous errors

    const paymentData = {
      name: formData.name,
      email: formData.email,
      plan: formData.plan,
      cardNumber: formData.cardNumber,
      expiryDate: formData.expiryDate,
      nameOnCard: formData.nameOnCard
    };

    try {
      await axios.post('http://localhost:8080/api/payments', paymentData);
      setSuccess(true); // Set success to true
      setTimeout(() => {
        navigate('/receipt', {
          state: { ...formData }
        });
      }, 2000); // Wait 2 seconds before navigating to the receipt page
    } catch (err) {
      setError('An error occurred while processing the payment.');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register and Payment</h2>
      {loading ? (
        <p className="loading-message">Processing payment, please wait...</p>
      ) : success ? (
        <p className="success-message">Payment successful! Redirecting to receipt...</p>
      ) : (
        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="plan">Selected Plan:</label>
            <input
              type="text"
              id="plan"
              value={formData.plan}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              required
              maxLength="16"
              placeholder="Enter 16-digit card number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date:</label>
            <input
              type="text"
              id="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              required
              placeholder="MM/YY"
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV:</label>
            <input
              type="password"
              id="cvv"
              value={formData.cvv}
              onChange={handleChange}
              required
              maxLength="3"
              placeholder="CVV"
            />
          </div>
          <div className="form-group">
            <label htmlFor="nameOnCard">Name on Card:</label>
            <input
              type="text"
              id="nameOnCard"
              value={formData.nameOnCard}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="pass">Password:</label>
            <input
              type="password"
              id="pass"
              value={formData.pass}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="cta-button">Submit</button>
        </form>
      )}
    </div>
  );
};

export default PaymentForm;
