import React, { useState } from 'react';
import './Login.css';
import assets from '../../assets/assets';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = currState === "Sign up" ? '/api/auth/register' : '/api/auth/login';
      const response = await axios.post(`http://localhost:5000${endpoint}`, formData);
      
      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Redirect to chat page
      navigate('/chat');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className='login'>
      <img src={assets.logo_big} className='logo' alt="" />
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{currState}</h2>
        {error && <div className="error-message">{error}</div>}
        
        {currState === "Sign up" && (
          <input
            type="text"
            name="username"
            placeholder='Username'
            className="form-input"
            value={formData.username}
            onChange={handleChange}
            required
          />
        )}
        
        <input
          type="email"
          name="email"
          placeholder='Email address'
          className="form-input"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <input
          type="password"
          name="password"
          placeholder='Enter your password'
          className="form-input"
          value={formData.password}
          onChange={handleChange}
          required
        />
        
        <button type='submit'>
          {currState === "Sign up" ? "Create account" : "Login now"}
        </button>
        
        <div className="login-term">
          <input type="checkbox" required />
          <p>Agree to the terms of use & privacy policy</p>
        </div>
        
        <div className="login-forgot">
          {currState === "Sign up" ? (
            <p className='login-toggle'>
              Already have an account <span onClick={() => setCurrState("Login")}>login here</span>
            </p>
          ) : (
            <p className='login-toggle'>
              Create an account <span onClick={() => setCurrState("Sign up")}>click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;