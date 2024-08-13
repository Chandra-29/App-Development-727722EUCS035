import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = () => {
  const { plan } = useParams();
  const navigate = useNavigate();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    atmPin: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };

  const handlePayment = () => {
    // Basic validation
    if (
      !cardDetails.cardNumber ||
      !cardDetails.expiryDate ||
      !cardDetails.cvv ||
      !cardDetails.cardholderName ||
      !cardDetails.atmPin
    ) {
      alert('Please fill out all fields');
      return;
    }

    // Trigger card animation
    document.querySelector('.card').classList.add('payment-success');
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setPaymentSuccess(true);
    }, 3000);

    // Navigate back to home page after 3 seconds
    setTimeout(() => {
      navigate('/');
    }, 6000);
  };

  const planDetails = {
    basic: { name: 'Basic Plan', price: '$10/month' },
    standard: { name: 'Standard Plan', price: '$20/month' },
    premium: { name: 'Premium Plan', price: '$30/month' },
  };

  const selectedPlan = planDetails[plan] || {};

  return (
    <div className="payment-page">
      {!paymentSuccess ? (
        <>
          <h1>Payment for {selectedPlan.name}</h1>
          <p>Price: {selectedPlan.price}</p>
          <div className="card-animation">
            <div className="atm-slot">
              <div className="card">
                <div className="card-details">
                  <label>
                    Cardholder Name:
                    <input
                      type="text"
                      name="cardholderName"
                      value={cardDetails.cardholderName}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label>
                    Card Number:
                    <input
                      type="number"
                      name="cardNumber"
                      value={cardDetails.cardNumber}
                      onChange={handleChange}
                      required
                      pattern="\d{16}"
                      maxLength="16"
                    />
                  </label>
                  <label>
                    Expiry Date:
                    <input
                      type="date"
                      name="expiryDate"
                      value={cardDetails.expiryDate}
                      onChange={handleChange}
                      required
                      pattern="\d{2}/\d{2}"
                      placeholder="MM/YY"
                    />
                  </label>
                  <label>
                    CVV:
                    <input
                      type="number"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleChange}
                      required
                      pattern="\d{3}"
                      maxLength="3"
                    />
                  </label>
                  <label>
                    ATM PIN:
                    <input
                      type="password"
                      name="atmPin"
                      value={cardDetails.atmPin}
                      onChange={handleChange}
                      required
                      pattern="\d{4}"
                      maxLength="4"
                    />
                  </label>
                </div>
              </div>
            </div>-
          </div>
          <button type="button" onClick={handlePayment}>
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </>
      ) : (
        <div className="success-message">
          <h2>Payment Successful!</h2>
          <p>Redirecting to home page...</p>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;