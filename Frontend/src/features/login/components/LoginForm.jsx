import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"; // ✅ correcto para v3.1.2
import "../styles/login.css";

const LoginForm = ({ onToggle }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = await loginUser(formData);

    console.log("🔐 TOKEN RECIBIDO:", token);

    if (!token || typeof token !== "string") {
      throw new Error("Invalid token");
    }

    // ✅ Save the token to localStorage
    localStorage.setItem("token", token);

    const decoded = jwt_decode(token);
    const userRole = decoded.role;

    alert("Login successful");

    if (userRole === "admin") {
      navigate("/admin/home");
    } else {
      navigate("/client/home"); // Make sure this path matches your router
    }
  } catch (error) {
    console.error("❌ Login error:", error.message);
    alert(error.message || "Invalid credentials");
  }
};


  return (
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <span className="icon"><FaUser /></span>
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span className="icon"><FaLock /></span>
        </div>
        <div className="options">
          <label>
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
            />
            Remember me
          </label>
          
        </div>
        <button type="submit">Login</button>
        <div className="register">
          Don’t have an account? <a href="#" onClick={onToggle}>Register</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
