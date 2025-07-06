// src/features/client/services/bookingService.js
const BASE_CREATE_URL = 'http://localhost:8086/api/bookings';
const BASE_DELETE_URL = 'http://localhost:8086/api/bookings';

export const createBooking = async (bookingData) => {
  const res = await fetch(BASE_CREATE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });
  if (!res.ok) throw new Error('Error creating booking');
  return res.json();
};

export const deleteBooking = async (bookingId) => {
  const res = await fetch(`http://localhost:8089/api/bookings/${bookingId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error deleting booking');
  return res.text();
};


export const getBookings = async () => {
  const res = await fetch('http://localhost:8086/api/bookings');
  if (!res.ok) throw new Error('Error fetching bookings');
  return res.json();
};

export const getBookingsByCustomer = async (customerName) => {
  const res = await fetch(`http://localhost:8090/api/bookings?customer=${encodeURIComponent(customerName)}`);
  if (!res.ok) throw new Error('Error fetching bookings');
  return res.json();
};


