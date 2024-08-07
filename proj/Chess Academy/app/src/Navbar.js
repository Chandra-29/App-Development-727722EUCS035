// src/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h1>GrandMaster Chess Academy</h1>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/plans">Plans</Link></li>
        <li><Link to="/tournaments">Tournaments</Link></li>
        {isAuthenticated ? (
          <li><button onClick={handleLogout} className="nav-button">Logout</button></li>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        )}
        <li><Link to="/admin">Admin</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;