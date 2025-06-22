// src/features/login/pages/LoginPage.jsx
import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import "../styles/login.css";

const LoginPage = () => {
  const [showRegister, setShowRegister] = useState(false);

  const handleToggle = () => {
    setShowRegister((prev) => !prev);
  };

  return (
    <div className="login-wrapper">
      {showRegister ? (
        <RegisterForm onToggle={handleToggle} />
      ) : (
        <LoginForm onToggle={handleToggle} />
      )}
    </div>
  );
};

export default LoginPage;


