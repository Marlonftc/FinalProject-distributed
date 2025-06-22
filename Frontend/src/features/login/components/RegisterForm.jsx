import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { registerUser } from "../services/authService";
import "../styles/login.css";

const RegisterForm = ({ onToggle }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const result = await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      alert("Usuario registrado correctamente");
      if (onToggle) onToggle(); // vuelve a login
    } catch (error) {
      alert("Error al registrar usuario");
    }
  };

  return (
    <div className="login-box">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <span className="icon"><FaUser /></span>
        </div>

        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <span className="icon"><FaEnvelope /></span>
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span className="icon"><FaLock /></span>
        </div>

        <div className="input-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <span className="icon"><FaLock /></span>
        </div>

        <button type="submit">Create Account</button>
        <div className="register">
          Already have an account? <a href="#" onClick={onToggle}>Login</a>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
