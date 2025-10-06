import axios from "axios";

  const API_URL = "https://two47withgrocerystoreram-backend.onrender.com";
const API = `${API_URL}/api/cart`;

export const getCart = async (userId,token) => {
  const res = await axios.get(`${API}/${userId}`,{
  //const res = await axios.get(`http://localhost:5000/api/cart/${userId}`,{
    headers:{Authorization: `Bearer ${token}`}
  });
  return res.data;
};

export const addToCart = async (userId, productId, quantity = 1,token) => {
  const res = await axios.post(`${API}/add`, { userId, productId, quantity },{
  //const res = await axios.post("http://localhost:5000/api/cart/add", { userId, productId, quantity },{
        headers: { Authorization: `Bearer ${token}` }

  })
  return res.data;
};

export const removeFromCart = async (userId, productId,token) => {
  const res = await axios.delete(`${API}/remove/${userId}/${productId}`,{
  //const res = await axios.delete(`http://localhost:5000/api/cart/remove/${userId}/${productId}`,{
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const clearCart = async (userId,token) => {
  const res = await axios.delete(`${API}/clear/${userId}`,{
  //const res = await axios.delete(`http://localhost:5000/api/cart/clear/${userId}`,{
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
