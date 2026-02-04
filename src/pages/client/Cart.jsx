import OrderSummary from "./OrderSummary";
import { useEffect } from "react";
import { removeFromCart } from "../../services/cartServices";
import axios from 'axios'

import './Cart.css'
function Cart({ cart, setCart, removeItemFromCart }) {
        const userId = localStorage.getItem("userId");

  const API_URL = "https://two47withgrocerystoreram-backend.onrender.com";
  //const API_URL = "http://localhost:5000";


    const getFinalPrice = (product) => {
        if (product.isOffer && product.discountPercentage > 0) {
            return Math.round(
            product.price - (product.price * product.discountPercentage) / 100
            );
        }
        return product.price;
    };


        useEffect(() => {
                const fetchCart = async () => {
                if (!userId) return;   // 👈 stop if no user
                try {
                const res = await axios.get(`${API_URL}/api/cart/${userId}`);
                setCart(res.data.items);
                } catch (err) {
                console.error("Error fetching cart", err);
                }
            };
            fetchCart();
        }, [userId,setCart]);

    const setQuantity = (_id, quantity) => {
        const updateCart = cart.map((p) =>
            p._id === _id ? { ...p, quantity: Number(quantity) } : p
        );
        setCart(updateCart);
    };

    const handleRemove = async (productId) => {
    const updated = await removeFromCart(userId, productId);
    setCart(updated.items);
    };

    return (
        <div className="container mt-5 p-3">
            <strong>
                <h4>
                    <span style={{ color: "rgb(252, 107, 3)" }}>Shopping</span> Cart
                </h4>
            </strong>

            <div className="row">
                {/* LEFT SIDE (Cart Items) */}
                <div className="cart-container col-md-8">
                    <div className="cart-header mt-3">
                        <div className="product-col"><h5>Product</h5></div>
                        <div className="subtotal-col"><h5>SubTotal</h5></div>
                        <div className="action-col"><h5>Action</h5></div>
                    </div>

                    {cart.length === 0 ? (
                        <p className="mt-3">Your Cart Is Empty</p>
                    ) : (
                    cart.map((p) => {
                        if (!p.productId) return null; // skip invalid items

                        return (
                            <div key={p._id} className="cart-row">
                            <div className="cart-product-info">
                                <img
                                src={p.productId.image}
                                alt={p.productId.name}
                                />
                                <div>
                                <h6 className="mb-1">{p.productId.name}</h6>
                                <small className="mb-1">
                                    ₹{getFinalPrice(p.productId)}
                                    {p.productId.isOffer && (
                                    <span style={{ textDecoration: "line-through", color: "gray", marginLeft: 6 }}>
                                    ₹{p.productId.price}
                                    </span>
                                    )}
                                </small>

                                <input
                                    type="number"
                                    min={1}
                                    value={p.quantity}
                                    onChange={(e) => setQuantity(p._id, e.target.value)}
                                />
                                </div>
                            </div>
                            <div className="cart-subtotal">
                                ₹{getFinalPrice(p.productId) * p.quantity}
                            </div>

                            <div className="cart-action">
                                <button
                                className="cart-remove-btn"
                                onClick={() => handleRemove(p.productId._id)}
                                >
                                ❌
                                </button>
                            </div>
                            </div>
                        );
                        })

                    )}
                </div>

                {/* RIGHT SIDE (Payment Section) */}
                <div className="col-md-4">
                    <OrderSummary cart={cart} setCart={setCart}/>
                </div>
            </div>
        </div>
    );
}

export default Cart;
