// src/Plans.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Plans.css';

const Plans = () => {
  const navigate = useNavigate();

  const handleChoosePlan = (plan) => {
    navigate('/payment', { state: { plan } });
  };

  return (
    <div className="plans">
      <h1>Membership Plans</h1>
      <div className="plan-list">
        <div className="plan-item">
          <div className="plan-header">
            <h3><strong>Basic Plan</strong></h3>
            <p>Price: <strong>$10/month</strong></p>
          </div>
          <div className="plan-details">
            <p>Perfect for beginners looking to start their chess journey.</p>
            <ul>
              <li>✔ Access to beginner tutorials</li>
              <li>✔ Downloadable resources</li>
              <li>✔ Community forum access</li>
              <li>✔ Monthly newsletters with tips</li>
              <li>✔ 10% discount on merchandise</li>
              <li>✔ Priority support</li>
            </ul>
          </div>
          <button className="cta-button" onClick={() => handleChoosePlan('Basic')}>Choose Basic</button>
        </div>
        <div className="plan-item">
          <div className="plan-header">
            <h3><strong>Standard Plan</strong></h3>
            <p>Price: <strong>$20/month</strong></p>
          </div>
          <div className="plan-details">
            <p>Ideal for intermediate players looking to enhance their skills.</p>
            <ul>
              <li>✔ Everything in Basic Plan</li>
              <li>✔ Access to intermediate tutorials</li>
              <li>✔ Monthly live Q&A sessions</li>
              <li>✔ Personalized training sessions</li>
              <li>✔ 15% discount on merchandise</li>
              <li>✔ Priority support with faster response times</li>
            </ul>
          </div>
          <button className="cta-button" onClick={() => handleChoosePlan('Standard')}>Choose Standard</button>
        </div>
        <div className="plan-item">
          <div className="plan-header">
            <h3><strong>Premium Plan</strong></h3>
            <p>Price: <strong>$30/month</strong></p>
          </div>
          <div className="plan-details">
            <p>Comprehensive access for serious players wanting to excel.</p>
            <ul>
              <li>✔ Everything in Standard Plan</li>
              <li>✔ Access to all courses</li>
              <li>✔ Online classes with experts</li>
              <li>✔ Discounts on tournament participation</li>
              <li>✔ 20% discount on merchandise</li>
              <li>✔ Priority support with dedicated account manager</li>
            </ul>
          </div>
          <button className="cta-button" onClick={() => handleChoosePlan('Premium')}>Choose Premium</button>
        </div>
      </div>
    </div>
  );
};

export default Plans;