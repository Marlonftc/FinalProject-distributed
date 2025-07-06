import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { getUserInfo as getUserData } from '../services/clientService';
import { FaUser, FaEnvelope, FaUserShield, FaSignOutAlt, FaCalendarPlus, FaClipboardList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HomeClient = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found. Please log in.');
      return;
    }

    try {
      const decoded = jwt_decode(token);
      const userId = decoded.userId || decoded.id || decoded.sub;

      getUserData(userId, token)
        .then((data) => setUser(data))
        .catch((err) => {
          console.error(err);
          setError('Failed to fetch user data');
        });
    } catch (err) {
      setError('Invalid token');
    }
  }, []);

  const handleViewBookings = () => navigate('/client/view-bookings');
  const handleBooking = () => navigate('/client/booking');
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (error) return <div className="text-red-600 p-6 text-center text-lg">{error}</div>;
  if (!user) return <div className="text-center p-6 text-xl">Loading user data...</div>;

  return (
    <div className="home-wrapper">
      <div className="home-box">
        <h1>🎉 Welcome, {user.name || user.username}!</h1>

        <div className="info"><FaUser /><span><strong>Name:</strong> {user.name}</span></div>
        <div className="info"><FaEnvelope /><span><strong>Email:</strong> {user.email}</span></div>
        <div className="info"><FaUserShield /><span><strong>Role:</strong> {user.role}</span></div>

        <div className="actions">
          <button onClick={handleBooking}><FaCalendarPlus /> Make a Booking</button>
          <button onClick={handleViewBookings}><FaClipboardList /> View My Bookings</button>
          <button onClick={handleLogout}><FaSignOutAlt /> Logout</button>
        </div>
      </div>
    </div>
  );
};

export default HomeClient;
