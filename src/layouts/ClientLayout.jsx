// ClientLayout.jsx
import Navbar from "../components/clientComponents/Navbar";
import { Outlet } from "react-router-dom";

function ClientLayout({ cart,setCart, isLoggedIn,setIsLoggedIn}) {
  return (
    <>
      <Navbar cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Outlet /> {/* 👈 here client pages will render */}
    </>
  );
}

export default ClientLayout;
