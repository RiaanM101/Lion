// src/components/pages/Store/LoginPage.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../../redux/authSlice';
import login from '../../services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../../styles/LoginPage.css'; // Import custom CSS if needed



const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(username, password);
      dispatch(loginAction(userData));
      // Redirect or perform any other action after successful login
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure
    }
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username"><FontAwesomeIcon icon={faUser} /> Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"><FontAwesomeIcon icon={faLock} /> Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};


export default LoginPage;
