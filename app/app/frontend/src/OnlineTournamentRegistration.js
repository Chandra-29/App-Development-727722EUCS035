import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios to make HTTP requests
import './TournamentRegistration.css';
import chess from './asserts/chess v1.mp4';

const OnlineTournamentRegistration = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { tournament, tournamentId = 'OL123', location = 'Online', date = '2024-12-01' } = state || {};

  const [formTournamentId, setFormTournamentId] = useState(tournamentId);
  const [formTournamentName, setFormTournamentName] = useState(tournament || '');
  const [playerName, setPlayerName] = useState('');
  const [email, setEmail] = useState('');
  const [formLocation, setFormLocation] = useState(location);
  const [formDate, setFormDate] = useState(date);
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formTournamentId && formTournamentName && playerName && email && formLocation && formDate) {
      try {
        const response = await axios.post('http://localhost:8080/api/tournaments', {
          tid: formTournamentId,
          tname: formTournamentName,
          pname: playerName,
          email: email,
          location: formLocation,
          date: formDate,
        });

        // Log or use the response data
        console.log('Registration successful:', response.data);

        // Navigate to the tournament details page
        navigate('/tournament-details', {
          state: {
            tournamentId: formTournamentId,
            tournamentName: formTournamentName,
            playerName,
            email,
            location: formLocation,
            date: formDate,
            successMessage: 'Registration successful! You have successfully registered for the online tournament.'
          }
        });
      } catch (error) {
        console.error('There was an error registering for the tournament!', error);
        setError('Registration failed. Please try again.');
      }
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className='video-background'>
      <video src={chess} autoPlay loop muted id='background'></video>
      <div className="registration-container">
        <h2>Register for {formTournamentName || 'Online Tournament'}</h2>
        <form className="registration-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="tournamentId">Tournament ID:</label>
            <input
              type="text"
              id="tournamentId"
              value={formTournamentId}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="tournamentName">Tournament Name:</label>
            <input
              type="text"
              id="tournamentName"
              value={formTournamentName}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="playerName">Player Name:</label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
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
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              value={formLocation}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={formDate}
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

export default OnlineTournamentRegistration;
