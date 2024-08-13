// src/Tournaments.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Tournaments.css';

const Tournaments = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedWinner, setSelectedWinner] = useState(null);
  const navigate = useNavigate();

  const handleWinnerClick = (winner) => {
    setSelectedWinner(winner);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedWinner(null);
  };

  const handleParticipateClick = (tournament, type) => {
    if (type === 'online') {
      navigate('/online-tournament-registration', { state: { tournament } });
    } else if (type === 'offline') {
      navigate('/offline-tournament-registration', { state: { tournament } });
    }
  };

  const winners = [
    // Winners data
  ];

  return (
    <div className="tournaments-container">
      <div className="tournaments-grid">
        <div className="tournament-card online-tournament">
          <h3 className='tf'>Online Tournaments</h3>
          <img 
            src="https://4kwallpapers.com/images/walls/thumbs/16663.jpg" 
            alt="Online Tournament" 
            className="tournament-image" 
          />
          <p>Join our exciting online tournaments and compete against players from around the world. Earn points, climb the leaderboard, and win amazing prizes!</p>
          
          <div className="tournament-list">
            <h4><strong>Upcoming Online Tournaments:</strong></h4>
            <ul>
              <li>
                <strong>Spring Championship</strong> - Prize: $1,000 | Entry Fee: $10
                <button onClick={() => handleParticipateClick('Spring Championship', 'online')} className="cta-button">Participate</button>
              </li>
              <li>
                <strong>Summer Blitz</strong> - Prize: $500 | Entry Fee: $5
                <button onClick={() => handleParticipateClick('Summer Blitz', 'online')} className="cta-button">Participate</button>
              </li>
              <li>
                <strong>Fall Open</strong> - Prize: $750 | Entry Fee: $15
                <button onClick={() => handleParticipateClick('Fall Open', 'online')} className="cta-button">Participate</button>
              </li>
              <li>
                <strong>Winter Cup</strong> - Prize: $1,200 | Entry Fee: $20
                <button onClick={() => handleParticipateClick('Winter Cup', 'online')} className="cta-button">Participate</button>
              </li>
              <li>
                <strong>Monthly Arena</strong> - Prize: $300 | Entry Fee: Free
                <button onClick={() => handleParticipateClick('Monthly Arena', 'online')} className="cta-button">Participate</button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="tournament-card offline-tournament">
          <h3 className='tf'>Offline Tournaments</h3>
          <img 
            src="https://4kwallpapers.com/images/walls/thumbs_2t/16674.jpg" 
            alt="Offline Tournament" 
            className="tournament-image" 
          />
          <p>Experience the thrill of over-the-board chess at our offline tournaments. Meet fellow players, learn from experts, and showcase your skills .</p>
          
          <div className="tournament-list">
            <h4><strong>Upcoming Offline Tournaments:</strong></h4>
            <ul>
              <li>
                <strong>City Championship</strong> - Prize: $500 | Entry Fee: $20
                <button onClick={() => handleParticipateClick('City Championship', 'offline')} className="cta-button">Participate</button>
              </li>
              <li>
                <strong>State Open</strong> - Prize: $300 | Entry Fee: $15
                <button onClick={() => handleParticipateClick('State Open', 'offline')} className="cta-button">Participate</button>
              </li>
              <li>
                <strong>Regional Qualifiers</strong> - Prize: $400 | Entry Fee: $25
                <button onClick={() => handleParticipateClick('Regional Qualifiers', 'offline')} className="cta-button">Participate</button>
              </li>
              <li>
                <strong>National Invitational</strong> - Prize: $1,000 | Entry Fee: $50
                <button onClick={() => handleParticipateClick('National Invitational', 'offline')} className="cta-button">Participate</button>
              </li>
              <li>
                <strong>Local Club Tournament</strong> - Prize: $200 | Entry Fee: $10
                <button onClick={() => handleParticipateClick('Local Club Tournament', 'offline')} className="cta-button">Participate</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="results-section">
        <h3>Results</h3>
        <p>Here are the winners from our academy's recent tournaments:</p>
        
        <div className="results-container">
          <div className="results-column">
            <h4><strong>Recent Tournament Winners:</strong></h4>
            <div className="results-list">
              {winners.slice(0, 3).map((winner, index) => (
                <div key={index} className="result-card" onClick={() => handleWinnerClick(winner)}>
                  <img 
                    src={winner.image} 
                    alt={winner.name} 
                    className="winner-image" 
                  />
                  <div className="winner-details">
                    <strong>{winner.name}</strong>
                    <p>{winner.tournament} - 1st Place</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="results-column">
            <h4><strong>More Recent Winners:</strong></h4>
            <div className="results-list">
              {winners.slice(3).map((winner, index) => (
                <div key={index} className="result-card" onClick={() => handleWinnerClick(winner)}>
                  <img 
                    src={winner.image} 
                    alt={winner.name} 
                    className="winner-image" 
                  />
                  <div className="winner-details">
                    <strong>{winner.name}</strong>
                    <p>{winner.tournament} - 1st Place</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <img 
              src={selectedWinner.image} 
              alt={selectedWinner.name} 
              className="winner-image" 
            />
            <h3>{selectedWinner.name}</h3>
            <p>{selectedWinner.tournament} - 1st Place</p>
            <p>{selectedWinner.details}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tournaments;
