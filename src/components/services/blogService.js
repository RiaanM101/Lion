import axios from 'axios';

const API_URL = '/api/blogs/';

const addBlog = async (blogData) => {
  const response = await axios.post(API_URL, blogData, { headers: { 'x-auth-token': localStorage.getItem('token') } });
  return response.data;
};

const updateBlog = async (id, blogData) => {
  const response = await axios.put(API_URL + id, blogData, { headers: { 'x-auth-token': localStorage.getItem('token') } });
  return response.data;
};

const fetchBlogs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const blogService = {
  addBlog,
  updateBlog,
  fetchBlogs,
};

export default blogService;
