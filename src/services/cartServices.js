import axios from "axios";

  const API_URL = "https://two47withgrocerystoreram-backend.onrender.com";
const API = `${API_URL}/api/cart`;

export const getCart = async (userId) => {
  const res = await axios.get(`${API}/${userId}`);
  return res.data;
};

export const addToCart = async (userId, productId, quantity = 1) => {
  const res = await axios.post(`${API}/add`, { userId, productId, quantity });
  return res.data;
};

export const removeFromCart = async (userId, productId) => {
  const res = await axios.delete(`${API}/remove/${userId}/${productId}`);
  return res.data;
};

export const clearCart = async (userId) => {
  const res = await axios.delete(`${API}/clear/${userId}`);
  return res.data;
};
