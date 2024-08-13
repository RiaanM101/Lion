import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:5000/api';

const getAuthHeader = () => ({
  headers: { 'x-auth-token': localStorage.getItem('token') }
});

const addProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(API_URL + id, productData, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(API_URL + id, getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

const fetchCategories = async () => {
  try {
    const response = await axios.get(API_URL + '/ProductCategory/GetAllCategories', getAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

const productService = {
  addProduct,
  updateProduct,
  fetchProducts,
  deleteProduct,
  fetchCategories, // Added fetchCategories to the service
};

export default productService;
