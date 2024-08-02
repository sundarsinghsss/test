// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Adjust if needed

export const getItems = () => axios.get(`${API_URL}/items`);
export const createItem = (name) => axios.post(`${API_URL}/item`, { name });
export const updateItem = (id, name) => axios.put(`${API_URL}/item/${id}`, { name });
export const deleteItem = (id) => axios.delete(`${API_URL}/item/${id}`);
