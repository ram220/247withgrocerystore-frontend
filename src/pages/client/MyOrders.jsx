import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  const API_URL = "https://two47withgrocery-backend.onrender.com";

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        setOrders([]);
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/api/orders/${userId}`);
        setOrders(res.data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="container mt-5 p-3">
      <h4>
        <span style={{ color: "rgb(252, 107, 3)" }}>My</span> Orders
      </h4>

      {orders.length === 0 ? (
        <p className="mt-3">You have no orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="border p-3 mb-3 rounded">
            <h6>Order ID: {order._id}</h6>
            <p>Status: <strong>{order.status}</strong></p>
            <p>Date: {new Date(order.orderDate).toLocaleString()}</p>
            <p>Total Amount: ₹{order.totalAmount.toFixed(2)}</p>

            <div className="row border-top pt-2">
              {(order.items || []).map((item) => (
                <div key={item._id} className="col-md-6 d-flex align-items-center mb-2">
                  <img
                    src={`${API_URL}${item.productId.image}`}
                    alt={item.productId.name}
                    style={{ height: "60px", width: "60px", marginRight: "10px" }}
                  />
                  <div>
                    <h6 className="mb-1">{item.productId.name}</h6>
                    <small>₹{item.price} × {item.quantity}</small><br />
                    <strong>Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
