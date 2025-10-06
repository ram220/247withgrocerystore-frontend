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
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  
    // Admin states
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://two47withgrocerystoreram-backend.onrender.com";

  const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};


  useEffect(() => {
  const verifyTokens = () => {
    const userToken = localStorage.getItem("userToken");
    const adminToken = localStorage.getItem("adminToken");

    if (userToken) {
      const decoded = decodeToken(userToken);
      if (decoded && decoded.exp * 1000 > Date.now()) {
        setIsUserLoggedIn(true);
        const remainingTime = decoded.exp * 1000 - Date.now();
        setTimeout(() => {
          localStorage.removeItem("userToken");
          localStorage.removeItem("userId");
          setIsUserLoggedIn(false);
          window.location.href = "/login";
        }, remainingTime);
      } else {
        localStorage.removeItem("userToken");
        localStorage.removeItem("userId");
      }
    }

    if (adminToken) {
      const decoded = decodeToken(adminToken);
      if (decoded && decoded.exp * 1000 > Date.now()) {
        setIsAdminLoggedIn(true);

         // Auto-logout for admin
        const remainingTime = decoded.exp * 1000 - Date.now();
        setTimeout(() => {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminId");
          setIsAdminLoggedIn(false);
          alert("Admin session expired! Please login again.");
          window.location.href = "/login";
        }, remainingTime);
      } else {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminId");
      }
    }

    setLoading(false);
  };

  verifyTokens();
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
              isLoggedIn={isUserLoggedIn}
              setIsUserLoggedIn={setIsUserLoggedIn}
              setIsAdminLoggedIn={setIsAdminLoggedIn}
            />
          }
        />
        <Route path="/admin" element={<AdminLayout isAdminLoggedIn={isAdminLoggedIn}/>}>
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
