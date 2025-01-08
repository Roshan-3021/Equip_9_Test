import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegistrationPage from "./RegistrationPage";
import LoginPage from "./LoginPage";
import LandingPage from "./LandingPage";
import "./App.css";

function App() {
  const [user, setUser] = useState(() => {
    // Retrieve user from localStorage if available
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Update localStorage whenever user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/register" />} />

          {/* Registration Page */}
          <Route path="/register" element={<RegistrationPage setUser={setUser} />} />


          {/* Login Page */}
          <Route path="/login" element={<LoginPage setUser={setUser} />} />

          {/* Landing Page - Protected Route */}
          <Route
            path="/landing"
            element={
              user ? (
                <LandingPage user={user} setUser={setUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
