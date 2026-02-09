// ClientLayout.jsx
//import Chatbot from "../components/clientComponents/Chatbot";
import Navbar from "../components/clientComponents/Navbar";
import { Outlet } from "react-router-dom";
import ChatBot from "../pages/client/ChatBot";

function ClientLayout({ cart,setCart, isLoggedIn,setIsUserLoggedIn}) {
  return (
    <>
      <Navbar cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn} />
      <ChatBot cart={cart} setCart={setCart}/>
      
      <Outlet /> {/* 👈 here client pages will render */}
    </>
  );
}

export default ClientLayout;
