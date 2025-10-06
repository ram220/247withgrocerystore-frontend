import { useEffect, useState } from "react";
import axios from "axios";

function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("adminToken"); // Admin token
  const limit = 2; // orders per page

  const API_URL = "https://two47withgrocerystoreram-backend.onrender.com";


  // Fetch orders with pagination
  const fetchOrders = async (page = 1) => {
    try {
      if (!token) {
        setOrders([]);
        return;
      }

      //const res = await axios.get(`${API_URL}/api/admin/all-orders?page=${page}&limit=${limit}`, {
      const res = await axios.get(`http://localhost:5000/api/admin/all-orders?page=${page}&limit=${limit}`, {

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data.orders);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
    }
  };

  // Update order status
  const updateStatus = async (orderId, status) => {
    try {
      if (!token) return;

      await axios.put(
        //`${API_URL}/api/admin/update-status/${orderId}`,
        `http://localhost:5000/api/admin/update-state/${orderId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchOrders(currentPage);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  return (
    <div className="container mt-1 p-1">
      <h4>
        <span style={{ color: "rgb(252, 107, 3)" }}>All</span> Orders
      </h4>

      {orders.length === 0 ? (
        <p className="mt-3">No orders yet.</p>
      ) : (
        <>
          {orders.map((order) => (
            <div key={order._id} className="border p-3 mb-3 rounded">
              <h6>Order ID: {order._id}</h6>
              <p>User: <strong>{order.userId.name} ({order.userId.email})</strong></p>
              <p>Address: <strong>{order.userId.address}</strong></p>
              <p>Mobile: <strong>{order.userId.mobile}</strong></p>
              <p>Status: <strong>{order.status}</strong></p>
              <p>Date: {new Date(order.orderDate).toLocaleString()}</p>
              <p>Total Amount: ₹{order.totalAmount}</p>

              <div className="row border-top pt-2">
                {order.items.map((item) => (
                  <div key={item._id} className="col-md-6 d-flex align-items-center mb-2">
                    <img
                      //src={`${API_URL}${item.productId.image}`}
                      src={`http://localhost:5000${item.productId.image}`}
                      alt={item.productId.name}
                      style={{ height: "60px", width: "60px", marginRight: "10px" }}
                    />
                    <div>
                      <h6 className="mb-1">{item.productId.name}</h6>
                      <small>₹{item.price} × {item.quantity}</small><br />
                      <strong>Subtotal: ₹{item.price * item.quantity}</strong>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-2">
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="form-select w-25"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}

          {/* Pagination Controls */}
          <div className="d-flex justify-content-between mt-3">
            <button
              className="btn btn-primary"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              className="btn btn-primary"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ViewOrders;
