import OrderSummary from "./OrderSummary";
import { useEffect, useState } from "react";
import { getCart, removeFromCart } from "../../services/cartServices";
import axios from 'axios'
function Cart({ cart, setCart, removeItemFromCart }) {
        const userId = localStorage.getItem("userId");

        const API_URL = "https://two47withgrocery-backend.onrender.com";

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
            }, [userId]);

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
                <div className="col-md-8">
                    <div className="row border-bottom mt-3">
                        <div className="col-md-6"><h5>Product</h5></div>
                        <div className="col-md-3"><h5>SubTotal</h5></div>
                        <div className="col-md-3"><h5>Action</h5></div>
                    </div>

                    {cart.length === 0 ? (
                        <p className="mt-3">Your Cart Is Empty</p>
                    ) : (
                    cart.map((p) => {
                        if (!p.productId) return null; // skip invalid items

                        return (
                            <div key={p._id} className="row align-items-center py-3 border-bottom">
                            <div className="col-md-6 d-flex align-items-center">
                                <img
                                src={`${API_URL}${p.productId.image}`}
                                alt={p.productId.name}
                                style={{ height: "60px", width: "60px", marginRight: "10px" }}
                                />
                                <div>
                                <h6 className="mb-1">{p.productId.name}</h6>
                                <small className="mb-1">₹{p.productId.price}</small><br />
                                <input
                                    type="number"
                                    min={1}
                                    value={p.quantity}
                                    onChange={(e) => setQuantity(p._id, e.target.value)}
                                    style={{ width: "40px", textAlign: "center" }}
                                />
                                </div>
                            </div>
                            <div className="col-md-3">
                                ₹{p.productId.price * p.quantity}
                            </div>
                            <div className="col-md-3">
                                <button
                                style={{ border: "none" }}
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
