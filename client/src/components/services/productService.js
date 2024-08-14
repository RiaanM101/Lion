import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://localhost:5000/api';

const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${API_URL}/ProductItem/AddItem`, productData);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

const updateProduct = async (id, productData) => {
  try {
    const response = await axios.put(`${API_URL}/ProductItem/UpdateItem/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/ProductItem/GetAllItems`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/ProductItem/DeleteItem/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/ProductCategory/GetAllCategories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

const fetchItemsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/ProductItem/GetAllItems?categoryId=${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product items:', error);
    throw error;
  }
};

const fetchCategoryById = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/ProductCategory/GetCategory/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
};

const productService = {
  addProduct,
  updateProduct,
  fetchProducts,
  deleteProduct,
  fetchCategories,
  fetchItemsByCategory,
  fetchCategoryById,
};

export default productService;