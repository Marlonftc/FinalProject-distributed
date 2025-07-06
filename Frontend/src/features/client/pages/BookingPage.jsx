import React, { useState } from 'react';
import { createBooking } from '../services/bookingService';
import { useNavigate } from 'react-router-dom';

const BookingPage = () => {
  const [form, setForm] = useState({ name: '', date: '', item: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const bookingData = {
        customer: form.name,
        date: form.date,
        item: form.item
      };
      await createBooking(bookingData);
      setMessage('✅ Booking created successfully!');
      setTimeout(() => navigate('/client/home'), 2000);
    } catch (err) {
      setMessage('❌ Error creating booking');
    }
  };

  return (
    <div className="home-wrapper">
      <div className="home-box">
        <h2 className="text-4xl font-bold mb-10 text-white drop-shadow-md">
          📅 Make a Booking
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">

          {/* Name Field */}
          <div className="relative">
            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-green-700 text-2xl">🧑</span>
            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/90 text-gray-800 placeholder-gray-500 shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-xl transition-all"
            />
          </div>

          {/* Date Field */}
          <div className="relative">
            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-green-700 text-2xl">📅</span>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/90 text-gray-800 shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-xl transition-all"
            />
          </div>

          {/* Item Field */}
          <div className="relative">
            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-green-700 text-2xl">🎪</span>
            <input
              name="item"
              placeholder="Item (e.g. chairs, tent)"
              value={form.item}
              onChange={handleChange}
              required
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/90 text-gray-800 placeholder-gray-500 shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-xl transition-all"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-2xl text-xl transition"
          >
            ✅ Book Now
          </button>
          <button
  type="button"
  onClick={() => navigate('/client/home')}
  className="w-full bg-gray-200 hover:bg-gray-300 text-black font-semibold py-3 rounded-2xl text-lg transition mt-3"
>
  🔙 Back to Home
</button>

          {/* Message */}
          {message && (
            <p className="text-base mt-5 text-white bg-black/50 rounded-md py-2 px-4 text-center w-full">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
