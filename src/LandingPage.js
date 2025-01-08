import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = ({ user, setUser }) => {
  const navigate = useNavigate();

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good Morning";
    if (hours < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const handleLogout = () => {
    setUser(null); // Clear user state
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="landing-container">
      <h2>
        {getGreeting()}, Welcome 😊 {user?.firstName || "Guest"} {user?.lastName || ""}
      </h2>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default LandingPage;
