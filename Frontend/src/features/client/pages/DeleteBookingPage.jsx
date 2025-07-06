import React, { useState } from 'react';
import { deleteBooking } from '../services/bookingService';


const DeleteBookingPage = () => {
  const [bookingId, setBookingId] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    try {
      await deleteBooking(bookingId);
      setMessage('✅ Booking deleted successfully!');
    } catch (err) {
      setMessage('❌ Error deleting booking');
    }
  };

  return (
    <div className="p-10 text-center">
      <h2 className="text-3xl mb-4 font-bold">Cancel a Booking</h2>
      <input
        type="text"
        placeholder="Enter Booking ID"
        value={bookingId}
        onChange={e => setBookingId(e.target.value)}
        className="p-2 border rounded w-full max-w-md"
      />
      <button onClick={handleDelete} className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
        Cancel Booking
      </button>
      <div className="mt-4 text-sm">{message}</div>
    </div>
  );
};

export default DeleteBookingPage;
