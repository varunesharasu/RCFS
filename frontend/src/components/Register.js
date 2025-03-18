import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Login.css";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username,
        email,
        password,
      });

      setMessage(response.data);
    } catch (error) {
      setMessage(error.response?.data || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Uncomment this function if you want to use Google Sign-In
  // const handleGoogleSignIn = () => {
  //   window.location.href = 'http://localhost:5000/auth/google';
  // };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Create Account</h2>
          <p className="login-subtitle">Fill in your details to get started</p>
        </div>
        
        {message && (
          <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleRegister} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-container">
              <input 
                id="username"
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
                placeholder="Choose a username"
              />
              <span className="input-icon">👤</span>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-container">
              <input 
                id="email"
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="Enter your email"
              />
              <span className="input-icon">✉️</span>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <input 
                id="password"
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="Create a password"
              />
              <span className="input-icon">🔒</span>
            </div>
          </div>
          
          <button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              'Create Account'
            )}
          </button>
          
          {/* Uncomment this section if you want to use Google Sign-In */}
          {/* 
          <div className="social-divider">
            <span>or</span>
          </div>
          
          <button 
            type="button"
            onClick={handleGoogleSignIn} 
            className="google-signin-button"
          >
            <span className="google-icon">G</span>
            Sign up with Google
          </button>
          */}
        </form>
        
        <div className="login-footer">
          <p>Already have an account? <Link to="/login" className="register-link">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
