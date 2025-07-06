import React, { useEffect, useState } from 'react';
import { getBookingsByCustomer, deleteBooking } from '../services/bookingService';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const ViewBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchBookings = async (name) => {
    try {
      const data = await getBookingsByCustomer(name);
      setBookings(data);
    } catch {
      setError('Error fetching bookings.');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found.');
      return;
    }

    try {
      const decoded = jwt_decode(token);
      const name = decoded.name || decoded.username || decoded.sub;
      fetchBookings(name);
    } catch {
      setError('Invalid token.');
    }
  }, []);

  const handleDelete = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await deleteBooking(bookingId);
      setBookings(prev => prev.filter(b => b.id !== bookingId));
    } catch {
      alert('Error deleting booking.');
    }
  };

  if (error) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-red-600 text-lg">
      ❌ {error}
    </div>
  );

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-10"
      style={{ backgroundImage: `url('/fondo.jpg')` }}>
      
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-10 w-full max-w-6xl">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-green-800 flex items-center gap-2">
            📋 Your Bookings
          </h2>
          <button
            onClick={() => navigate('/client/home')}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium transition"
          >
            ⬅️ Back to Home
          </button>
        </div>

        {bookings.length === 0 ? (
          <p className="text-gray-700 text-lg">No bookings found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left text-gray-700 border-collapse rounded-lg overflow-hidden shadow-md">
              <thead className="bg-green-600 text-white text-md">
                <tr>
                  <th className="px-5 py-3">Booking ID</th>
                  <th className="px-5 py-3">Service</th>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => (
                  <tr key={i} className="border-t border-gray-300 hover:bg-gray-100 transition">
                    <td className="px-5 py-3">{b.id}</td>
                    <td className="px-5 py-3">{b.item}</td>
                    <td className="px-5 py-3">{new Date(b.date).toLocaleDateString()}</td>
                    <td className="px-5 py-3 text-center">
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBookingsPage;
