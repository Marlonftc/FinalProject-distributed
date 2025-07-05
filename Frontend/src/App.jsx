import React from 'react';
import ThemeToggle from './features/client/components/ThemeToggle';
import ClientDashboard from './features/client/components/ClientDashboard';

function App() {
  const userId = 'user123'; // ✅ Puedes luego reemplazar con el ID real desde JWT

  return (
    <div style={{ minHeight: '100vh', position: 'relative', padding: '1rem' }}>
      {/* Botón para cambiar de tema (arriba a la derecha) */}
      <ThemeToggle userId={userId} />

      {/* Página principal del cliente */}
      <ClientDashboard />
    </div>
  );
}

export default App;
