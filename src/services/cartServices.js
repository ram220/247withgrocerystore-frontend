import axios from "axios";

const API_URL = "https://two47withgrocerystoreram-backend.onrender.com";
//    const API_URL = "http://localhost:5000";

const API = `${API_URL}/api/cart`;

export const getCart = async (userId,token) => {
  const res = await axios.get(`${API}/${userId}`,{
    headers:{Authorization: `Bearer ${token}`}
  });
  return res.data;
};

export const addToCart = async (userId, productId, quantity = 1,token) => {
  const res = await axios.post(`${API}/add`, { userId, productId, quantity },{
        headers: { Authorization: `Bearer ${token}` }

  })
  return res.data;
};

export const removeFromCart = async (userId, productId,token) => {
  const res = await axios.delete(`${API}/remove/${userId}/${productId}`,{
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const clearCart = async (userId,token) => {
  const res = await axios.delete(`${API}/clear/${userId}`,{
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
