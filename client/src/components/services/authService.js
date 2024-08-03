import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your actual API base URL

export const register = async (username,email, password,contact_number,address) => {
  const response = await axios.post(`${API_BASE_URL}/Auth/register`, {
    email,
    password,
    username,
    contact_number,
    address
  });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/Auth/login`, {
    email,
    password,
  });
  return response.data;
};
