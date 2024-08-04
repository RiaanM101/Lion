import axios from 'axios';

const API_BASE_URL = 'https://localhost:5000/api';

export const register = async (userDetails) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Auth/register`, userDetails);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const login = async (Email, Password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Auth/login`, { Email, Password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.response ? error.response.data : error.message);
    throw error;
  }
};
