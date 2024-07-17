import axios from 'axios';

const API_URL = '/api/products/';

const addProduct = async (productData) => {
  const response = await axios.post(API_URL, productData, { headers: { 'x-auth-token': localStorage.getItem('token') } });
  return response.data;
};

const updateProduct = async (id, productData) => {
  const response = await axios.put(API_URL + id, productData, { headers: { 'x-auth-token': localStorage.getItem('token') } });
  return response.data;
};

const fetchProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const productService = {
  addProduct,
  updateProduct,
  fetchProducts,
};

export default productService;
