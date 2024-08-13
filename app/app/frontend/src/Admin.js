import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('tournaments');
  const [tournaments, setTournaments] = useState([]);
  const [plans, setPlans] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === 'tournaments') {
      axios.get('http://localhost:8080/api/tournaments')
        .then(response => setTournaments(response.data))
        .catch(error => console.error('Error fetching tournaments:', error));
    } else if (activeTab === 'plans') {
      axios.get('http://localhost:8080/api/payments')
        .then(response => setPlans(response.data))
        .catch(error => console.error('Error fetching plans:', error));
    } else if (activeTab === 'users') {
      axios.get('http://localhost:8080/api/users/getall')
        .then(response => setUsers(response.data))
        .catch(error => console.error('Error fetching users:', error));
    }
  }, [activeTab]);

  const handleSearch = () => {
    setNotFound(false); // Reset not found flag
    let result = null;

    if (activeTab === 'tournaments') {
      result = tournaments.find(tournament => tournament.id === parseInt(searchId));
    } else if (activeTab === 'plans') {
      result = plans.find(plan => plan.id === parseInt(searchId));
    } else if (activeTab === 'users') {
      result = users.find(user => user.id === parseInt(searchId));
    }

    if (result) {
      setSearchResult(result);
    } else {
      setSearchResult(null);
      setNotFound(true);
    }
  };

  const handleDelete = () => {
    if (!searchResult) return;

    if (activeTab === 'tournaments') {
      axios.delete(`http://localhost:8080/api/tournaments/${searchResult.id}`)
        .then(() => {
          setTournaments(tournaments.filter(tournament => tournament.id !== searchResult.id));
          setSearchResult(null);
          setNotFound(false);
        })
        .catch(error => console.error('Error deleting tournament:', error));
    } else if (activeTab === 'plans') {
      axios.delete(`http://localhost:8080/api/payments/${searchResult.id}`)
        .then(() => {
          setPlans(plans.filter(plan => plan.id !== searchResult.id));
          setSearchResult(null);
          setNotFound(false);
        })
        .catch(error => console.error('Error deleting plan:', error));
    } else if (activeTab === 'users') {
      axios.delete(`http://localhost:8080/api/users/${searchResult.id}`)
        .then(() => {
          setUsers(users.filter(user => user.id !== searchResult.id));
          setSearchResult(null);
          setNotFound(false);
        })
        .catch(error => console.error('Error deleting user:', error));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const getPlaceholder = () => {
    switch (activeTab) {
      case 'tournaments':
        return 'Enter Tournament ID';
      case 'plans':
        return 'Enter Plan ID';
      case 'users':
        return 'Enter User ID';
      default:
        return 'Enter ID to search';
    }
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li onClick={() => setActiveTab('tournaments')}>Tournaments</li>
          <li onClick={() => setActiveTab('plans')}>Player Plans</li>
          <li onClick={() => setActiveTab('users')}>Users</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>
      <div className="content">
        <div className="search-container">
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder={getPlaceholder()}
          />
          <button onClick={handleSearch}>Search</button>
          {notFound && <p className="error-message">No record found with ID {searchId}</p>}
          {searchResult && (
            <div>
              <p>Found: ID {searchResult.id}</p>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
        {activeTab === 'tournaments' && (
          <div className="tab-content">
            <h2>Tournaments</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tournament ID</th>
                  <th>Tournament Name</th>
                  <th>Player Name</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(tournaments) && tournaments.length > 0 ? (
                  tournaments.map(tournament => (
                    <tr key={tournament.id}>
                      <td>{tournament.id}</td>
                      <td>{tournament.tid}</td>
                      <td>{tournament.tname}</td>
                      <td>{tournament.pname}</td>
                      <td>{tournament.email}</td>
                      <td>{tournament.location}</td>
                      <td>{tournament.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No tournaments found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'plans' && (
          <div className="tab-content">
            <h2>Player Plans</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Plan</th>
                  <th>Card Number</th>
                  <th>Expiry Date</th>
                  <th>Name on Card</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(plans) && plans.length > 0 ? (
                  plans.map(plan => (
                    <tr key={plan.id}>
                      <td>{plan.id}</td>
                      <td>{plan.name}</td>
                      <td>{plan.email}</td>
                      <td>{plan.plan}</td>
                      <td>{plan.cardNumber}</td>
                      <td>{plan.expiryDate}</td>
                      <td>{plan.nameOnCard}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No plans found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'users' && (
          <div className="tab-content">
            <h2>Users</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(users) && users.length > 0 ? (
                  users.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
