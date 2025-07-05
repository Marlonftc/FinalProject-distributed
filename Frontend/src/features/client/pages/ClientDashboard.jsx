import React from "react";
import ThemeToggle from "../components/ThemeToggle"; // Asegúrate de que esta ruta sea correcta

const ClientDashboard = () => {
  const userId = localStorage.getItem("userId");

  return (
    <div style={{ padding: "2rem", color: "white" }}>
      {/* Botón para cambiar el tema */}
      <ThemeToggle userId={userId} />

      <h1>Cliente</h1>
      <p>Bienvenido a tu panel de usuario.</p>
      {/* Aquí puedes agregar funcionalidades como crear reserva, ver historial, etc. */}
    </div>
  );
};

export default ClientDashboard;
