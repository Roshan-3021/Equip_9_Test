import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = ({ setUser }) => {
  const [formData, setFormData] = useState({ mobileNumber: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8083/perform_login/${formData.mobileNumber}/${formData.password}`
      );
      if (response.data) {
        setUser(response.data);
        navigate("/landing");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to login. Try again.");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      <button
        type="button"
        className="register-button"
        onClick={handleRegisterRedirect}
      >
        Register
      </button>
    </div>
  );
};

export default LoginPage;
