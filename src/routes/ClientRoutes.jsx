import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from '../pages/client/Home'; 
import Login from '../pages/client/Login';
import Products from '../pages/client/Products';
import Register from '../pages/client/Register';
import ClientLayout from '../layouts/ClientLayout';
import Cart from '../pages/client/Cart';
import SearchedPage from '../pages/client/SearchedPage';
import MyOrders from '../pages/client/MyOrders';
import ChangeAddress from '../pages/client/ChangeAddress';

import { 
    addToCart as addToCartService,
    removeFromCart as removeFromCartService 
} from "../services/cartServices";

function AppRoutes({cart,setCart,isLoggedIn,setIsUserLoggedIn,setIsAdminLoggedIn}){
    const userId = localStorage.getItem("userId");
   // ✅ Wrapper for adding item
    const addToCart = async (product) => {
        if (!userId) {
            alert("Please login to add to cart");
            return;
        }
        try {
            const updatedCart = await addToCartService(userId, product._id, 1);
            setCart(updatedCart.items);
            alert('Item added to cart😍')
        } catch (err) {
            console.error("Error adding to cart:", err);
        }
    };


    // ✅ Wrapper for removing item
    const removeItemFromCart = async (productId) => {
        if (!userId) {
            alert("Please login first");
            return;
        }
        try {
            const updatedCart = await removeFromCartService(userId, productId);
            setCart(updatedCart.items);
        } catch (err) {
            console.error("Error removing from cart:", err);
        }
    };
    return(
        <>
            <Routes>
                <Route element={<ClientLayout cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} setIsUserLoggedIn={setIsUserLoggedIn} />}>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login setIsUserLoggedIn={setIsUserLoggedIn} setCart={setCart}  setIsAdminLoggedIn={setIsAdminLoggedIn}/>}/>
                    <Route path="/products" element={<Products addToCart={addToCart}/>}/>
                    <Route path="/myorders" element={<MyOrders/>}/>
                    <Route path="register" element={<Register/>}/>
                    <Route path="/cart" element={<Cart cart={cart} setCart={setCart} removeItemFromCart={removeItemFromCart}/>}/>
                    <Route path="/search" element={<SearchedPage addToCart={addToCart}/>}/>
                    <Route path="/change-address" element={<ChangeAddress />} />
                    
                </Route>
            </Routes>
        </>
    )
}

export default AppRoutes;