import axios from 'axios';

const API_BASE_URL = 'http://localhost:7048/api'; // Replace with your actual API base URL

export const register = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, {
    email,
    password,
  });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};
