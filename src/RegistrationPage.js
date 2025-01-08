import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import FacebookLogin from 'react-facebook-login'; // Import Facebook Login
import {jwtDecode} from "jwt-decode"; // Correct import statement
import "./RegistrationPage.css";

const RegistrationPage = ({ setUser }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    password: "",
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8083/adduser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Registration successful!");
          navigate("/login");
        } else {
          alert("Failed to register. Try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to register. Try again.");
      });
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
  
    // Extract Google user info
    const googleUser = {
      firstName: decoded.given_name,
      lastName: decoded.family_name,
      email: decoded.email,
    };
  
    // Update global user state
    setUser(googleUser);
  
    // Navigate to landing page
    navigate("/landing");
  };

  const responseFacebook = (response) => {
    console.log(response); // Log the response for debugging

    // Extract Facebook user info
    if (response && !response.error) {
      const facebookUser = {
        firstName: response.first_name,
        lastName: response.last_name,
        email: response.email,
      };
      
      // Update global user state
      setUser(facebookUser);
      
      // Navigate to landing page
      navigate("/landing");
    } else {
      alert("Facebook login failed. Please try again.");
    }
  };

  return (
    <GoogleOAuthProvider clientId="572173384395-c55hturc2b9g38ru20r6iq0tnf5pa3q1.apps.googleusercontent.com"> {/* Replace with your actual Client ID */}
      <div className="registration-container">
        <h2>Register</h2>
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
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
            Register
          </button>
        </form>

        <div className="google-login-container" >
          <h3 className="or">or</h3>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => {
              alert("Google Login failed. Try again.");
            }}
          />
        </div>

        {/* Facebook Login */}
        <div className="facebook-login-container" style={{ marginTop: '20px', textAlign: 'center' }}>
          <h3>or</h3>
          <FacebookLogin
            appId="1236108170784900" // Replace with your actual App ID
            autoLoad={false} // Set to true if you want to load the login button automatically
            fields="name,email,picture"
            callback={responseFacebook} 
            cssClass="facebook-button" // Optional CSS class for styling
             // Optional icon for styling (requires Font Awesome)
          />
        </div>

        {/* Login Button */}
        <div className="login-button-container" style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>Already have an account?</p>
          <button 
            className="login-button" 
            onClick={() => navigate("/login")} // Navigate to Login Page
            style={{
              padding: '10px 20px',
              fontSize: '1rem',
              backgroundColor: '#6a8dff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b8d8f1'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6a8dff'}
          >
            Login
          </button>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default RegistrationPage;
