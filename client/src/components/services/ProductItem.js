// src/services/productItemService.js

const API_URL = 'http://localhost:5000/api/ProductItem'; // Update as needed

export const getAllItems = async (categoryId) => {
  const response = await fetch(`${API_URL}/GetAllItems${categoryId ? `?categoryId=${categoryId}` : ''}`);
  if (!response.ok) throw new Error('Failed to fetch items');
  return response.json();
};

export const getItem = async (itemId) => {
  const response = await fetch(`${API_URL}/GetItem/${itemId}`);
  if (!response.ok) throw new Error('Failed to fetch item');
  return response.json();
};

export const addItem = async (item) => {
  const formData = new FormData();
  for (const key in item) {
    formData.append(key, item[key]);
  }
  const response = await fetch(`${API_URL}/AddItem`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to add item');
  return response.json();
};

export const updateItem = async (itemId, item) => {
  const formData = new FormData();
  for (const key in item) {
    formData.append(key, item[key]);
  }
  const response = await fetch(`${API_URL}/UpdateItem/${itemId}`, {
    method: 'PUT',
    body: formData,
  });
  if (!response.ok) throw new Error('Failed to update item');
  return response.json();
};

export const deleteItem = async (itemId) => {
  const response = await fetch(`${API_URL}/DeleteItem/${itemId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete item');
  return response.json();
};
