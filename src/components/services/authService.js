// src/services/authService.js

import axios from 'axios';

const API_URL = 'http://yourapiurl.com/api/auth'; // Replace with your actual API URL

// Define the login function
const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Define other auth functions if needed

// Export the login function
export default login;
