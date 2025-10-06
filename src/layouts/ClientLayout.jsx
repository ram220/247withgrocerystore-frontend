// ClientLayout.jsx
import Navbar from "../components/clientComponents/Navbar";
import { Outlet } from "react-router-dom";

function ClientLayout({ cart,setCart, isLoggedIn,setIsUserLoggedIn}) {
  return (
    <>
      <Navbar cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn} />
      <Outlet /> {/* 👈 here client pages will render */}
    </>
  );
}

export default ClientLayout;
