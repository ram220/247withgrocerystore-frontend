import OrderSummary from "./OrderSummary";
import { useEffect } from "react";
import { removeFromCart } from "../../services/cartServices";
import axios from 'axios'

import './Cart.css'
function Cart({ cart, setCart, removeItemFromCart }) {
        const userId = localStorage.getItem("userId");

  //const API_URL = "https://two47withgrocerystoreram-backend.onrender.com";
  const API_URL = "http://localhost:5000";


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

    const setQuantity = async (productId, value,type) => {
        if (value <= 0) return;

        const res = await axios.put(`${API_URL}/api/cart/update`, {
            userId,
            productId,
            quantity: type === "KG" ? 1 : value,
            weight: type === "KG" ? value : null
        });

        setCart(res.data.items);
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
                                    ₹{(
                                        getFinalPrice(p.productId) *
                                        (p.productId.unit === "KG" ? (p.weight || 1) : p.quantity)
                                        ).toFixed(2)
                                    }

                                    {p.productId.unit === "KG" && (
                                        <span style={{ fontSize: "12px", color: "gray" }}>
                                        {" "}({p.weight} Kg)
                                        </span>
                                    )}
                                </small>


                                {p.productId.unit === "KG" ? (
                                <input
                                    type="number"
                                    min={0.25}
                                    step={0.25}
                                    value={p.weight || 1}
                                    onChange={(e) =>
                                    setQuantity(p.productId._id, Number(e.target.value), "KG")
                                    }
                                />
                                ) : (
                                <input
                                    type="number"
                                    min={1}
                                    value={p.productId.unit === "KG" ? p.weight : p.quantity}
                                    onChange={(e) =>
                                    setQuantity(p.productId._id, Number(e.target.value))
                                    }
                                />
                                )}
                                </div>
                            </div>
                            <div className="cart-subtotal">
                                ₹{(
                                    getFinalPrice(p.productId) *
                                    (p.productId.unit === "KG" ? (p.weight || 1) : p.quantity)
                                    ).toFixed(2)
                                }
                            
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
