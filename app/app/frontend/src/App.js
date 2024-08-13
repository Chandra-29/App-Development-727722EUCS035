// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import SignUp from './Signup';
import Courses from './Courses';
import CourseDetail from './CourseDetail';
import Tournaments from './Tournaments';
import TournamentDetail from './TournamentDetail';
import Plans from './Plans';
import { AuthProvider } from './AuthContext';
import Admin from './Admin'; // Import Admin component
import About from './About';
import './App.css';
import PaymentForm from './PaymentForm';

import Register from './Register';
import SuccessMessage from './SuccessMessage';
import TournamentRegistration from './TournamentRegistration';
import Receipt from './Receipt';
import OnlineTournamentRegistration from './OnlineTournamentRegistration';
import OfflineTournamentRegistration from './OfflineTournamentRegistration';
import AdminLogin from './AdminLogin';




const App = () => {
  const location = useLocation();

  // Define routes where the Navbar should not be displayed
  const noNavbarRoutes = ['/payment', '/admin'];

  // Check if the current location is in the noNavbarRoutes list
  const shouldShowNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <AuthProvider>
      <div className="app">
        {shouldShowNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} /> {/* Admin route */}
          <Route path="/payment" element={<PaymentForm />} />
          <Route path="/success" element={<SuccessMessage/>} />
          <Route path="/tournament-registration" element={<TournamentRegistration />} />
          <Route path="/tournament-details" element={<TournamentDetail />} />
          <Route path="/receipt" element={<Receipt />} />
          <Route path="/online-tournament-registration" element={<OnlineTournamentRegistration />} />
          <Route path="/offline-tournament-registration" element={<OfflineTournamentRegistration />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
