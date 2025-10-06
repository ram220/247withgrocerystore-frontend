import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OrderSummary({ cart,setCart }) {
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD"); // default COD
  const userId = localStorage.getItem("userId");

  const navigate=useNavigate();

  const API_URL = "https://two47withgrocerystoreram-backend.onrender.com";

  useEffect(() => {
    axios
      .get(`${API_URL}/api/auth/user/${userId}`)
      //.get(`http://localhost:5000/api/auth/user/${userId}`)
      .then((res) => {
        setAddress(res.data.address || "");
        setMobile(res.data.mobile || "");
      })
      .catch((err) => console.log(err));
  }, [userId]);


  const total = (cart.reduce((acc, item) => acc + item.productId.price * item.quantity, 0) * 1.02).toFixed(2);
  

  // handle place order
const placeOrder = async () => {
  if (cart.length === 0) {
    alert("Your cart is empty! Add items before placing an order.");
    return; 
  }

  const userId = localStorage.getItem("userId");
  const formattedItems = cart.map(item => ({
    productId: item.productId._id,
    quantity: item.quantity,
    price: item.productId.price
  }));

  const totalAmount = formattedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalAmountWithTax = totalAmount * 1.02;

  if (paymentMethod === "UPI") {
  try {
    const res = await axios.post(`${API_URL}/api/payment/init`, {
      //const res = await axios.post(`http://localhost:5000/api/payment/init`, {
      amount: totalAmountWithTax,
      userId,
      items: formattedItems
    });

   const options = {
      key: res.data.key,
      amount: res.data.amount,
      currency: res.data.currency,
      name: "247 Grocery Store",
      description: "Order Payment",
      order_id: res.data.orderId,
      handler: async function (response) {
        try {
          const verifyRes = await axios.post(`${API_URL}/api/payment/verify`, {
            //const verifyRes = await axios.post(`http://localhost:5000/api/payment/verify`, {
            ...response,
            tempPaymentId: res.data.tempPaymentId, // link back to tempPayment
          });

          if (verifyRes.data.success) {
            alert("✅ Payment successful! Order placed.");
            setCart([]); // clear cart in frontend
          } else {
            alert("❌ Payment verification failed");
          }
        } catch (err) {
          console.error("Verify error", err);
          alert("Verification error");
        }
      },
      prefill: {
          name: localStorage.getItem("userName") || "Customer",
          email: localStorage.getItem("userEmail") || "customer@example.com",
          contact: mobile || "9999999999",
        },
      theme: {
        color: "#fc6b03", // your orange theme
      },
    };

    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please refresh the page.");
      return;
    }
    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.error(err);
    alert("Failed to initiate Razorpay payment");
  }
  return; // stop COD logic
}

  // For COD
  try {
    const res = await axios.post(`${API_URL}/api/orders`, {
      //const res = await axios.post(`http://localhost:5000/api/orders`, {
      userId,
      items: formattedItems,
      totalAmount,
      paymentMethod
    });

    if (res.data.success) {
      alert("Order placed successfully!");
      setCart([]);
    }
  } catch (error) {
    console.error(error);
    alert("Failed to place order");
  }
};



  return (
    <div>
      <div className="card p-3 " style={{ minHeight: "350px", backgroundColor: "whitesmoke" }}>
        <strong>
          <h5 className="border-bottom">
            <span style={{ color: "rgb(252, 107, 3)" }}>Order</span> Summary
          </h5>
        </strong>
        <strong>
          <h6 className="mb-2">DELIVERY ADDRESS</h6>
        </strong>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <small className="mb-2">{address || "No Address Found"},</small>
            <small>{mobile}</small>
            </div>

            <button
              onClick={() => navigate("/change-address")}
              style={{
                border: "none",
                background: "none",
                color: "rgb(252, 107, 3)",
                cursor: "pointer",
                fontSize: "0.9rem",
                textDecoration: "none"
              }}>
              Change
            </button>
        </div>

        <div className="payment-method mt-2 border-bottom">
          <strong>
            <h6>PAYMENT METHOD</h6>
          </strong>
          <select
            className="w-100 mt-1"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="COD">Cash On Delivery</option>
            <option value="UPI">UPI</option>
          </select>
        </div>

        <div className="mt-2">
          <div className="price d-flex justify-content-between">
            <small>Price</small>
            <small>
              ₹{cart.reduce((acc, item) => acc + item.productId.price * item.quantity, 0)}
            </small>
          </div>

          <div className="mt-1 d-flex justify-content-between">
            <small>Shipping Fee</small>
            <small>
              <span style={{ color: "rgb(252, 107, 3)" }}>Free</span>
            </small>
          </div>

          <div className="mt-1 d-flex justify-content-between">
            <small>Tax (2%)</small>
            <small>
              ₹
              {(
                cart.reduce((acc, item) => acc + item.productId.price * item.quantity, 0) * 0.02
              ).toFixed(2)}
            </small>
          </div>

          <div className="mt-1 d-flex justify-content-between">
            <small>Total</small>
            <small>₹{total}</small>
          </div>

          <div className="place-order-btn mt-2">
            <button
              className="w-100"
              style={{
                backgroundColor: "rgb(252, 107, 3)",
                border: "1px solid rgb(252, 107, 3)",
                height: "30px",
                color: "white",
              }}
              onClick={placeOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OrderSummary;
