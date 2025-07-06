import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import ViewBookingsPage from './features/client/pages/ViewBookingsPage';


// 🔁 Client
import HomeClient from './features/client/pages/HomeClient';
import BookingPage from './features/client/pages/BookingPage';
import DeleteBookingPage from './features/client/pages/DeleteBookingPage';

// 🔁 Admin
import HomeAdmin from './features/admin/pages/HomeAdmin';

// 🔁 Login
import LoginPage from './features/login/pages/LoginPage';
import RegisterPage from './features/login/pages/RegisterPage';

// 🔁 Tema (toggle para light/dark)
import ThemeToggle from './features/client/components/ThemeToggle';

function App() {
  const token = localStorage.getItem('token');
  const decoded = token ? jwt_decode(token) : null;
  const role = decoded?.role;
  const userId = decoded?.userId || decoded?.id || decoded?.sub;

  return (
    <Router>
      <div style={{ minHeight: '100vh', position: 'relative', padding: '1rem' }}>
        {/* Mostrar el botón de cambio de tema solo si está logueado */}
        {userId && <ThemeToggle userId={userId} />}

        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Rutas para cliente */}
          <Route path="/client/home" element={<HomeClient />} />
          <Route path="/client/booking" element={<BookingPage />} />
          <Route path="/client/delete-booking" element={<DeleteBookingPage />} />

          {/* Ruta para administrador */}
          <Route path="/admin/home" element={<HomeAdmin />} />

          {/* Redirección automática basada en rol */}
          <Route
            path="*"
            element={
              token && role ? (
                <Navigate to={`/${role}/home`} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/client/view-bookings" element={<ViewBookingsPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
