import logo from './logo.svg';
import './App.css';
import ClientRoutes from './routes/ClientRoutes';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import AddProducts from './pages/admin/AddProducts';
import ViewProducts from './pages/admin/ViewProducts';
import MonthlyIncome from './pages/admin/MonthlyIncome';
import ViewOrders from './pages/admin/ViewOrders';
import axios from 'axios';

function App() {
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://two47withgrocery-backend.onrender.com";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    // ✅ Assume logged in if token exists
    if (token && userId) setIsLoggedIn(true);

    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/api/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.data.valid) {
          localStorage.clear();
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("Token verification error:", err.message);
        // ❌ Do NOT clear token immediately
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <ClientRoutes
              cart={cart}
              setCart={setCart}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="addproducts" element={<AddProducts />} />
          <Route path="viewproducts" element={<ViewProducts />} />
          <Route path="vieworders" element={<ViewOrders />} />
          <Route path="profitability" element={<MonthlyIncome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
