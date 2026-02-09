import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OrderSummary({ cart,setCart }) {
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD"); // default COD
  const userId = localStorage.getItem("userId");

  const navigate=useNavigate();

  //const API_URL = "https://two47withgrocerystoreram-backend.onrender.com";
  const API_URL = "http://localhost:5000";

  const DELIVERY_CHARGE = 20;

  useEffect(() => {
    axios
      .get(`${API_URL}/api/auth/user/${userId}`)
      .then((res) => {
        setAddress(res.data.address || "");
        setMobile(res.data.mobile || "");
      })
      .catch((err) => console.log(err));
  }, [userId]);


const getFinalPrice = (product) => {
  if (product.isOffer && product.discountPercentage > 0) {
    return Math.round(
      product.price - (product.price * product.discountPercentage) / 100
    );
  }
  return product.price;
};

const itemsTotal = cart.reduce(
  (acc, item) => acc + getFinalPrice(item.productId) * item.quantity,
  0
);

const total = itemsTotal + DELIVERY_CHARGE;
  

  // handle place order
const placeOrder = async () => {
  if (cart.length === 0) {
    alert("Your cart is empty! Add items before placing an order.");
    return; 
  }

  if (!address || !mobile) {
  alert("Please add delivery address and mobile number");
  return;
}


const formattedItems = cart.map(item => ({
  productId: item.productId._id,
  quantity: item.quantity,
  price: getFinalPrice(item.productId)
}));


const totalAmount =
  formattedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ) + DELIVERY_CHARGE;


  
  if (paymentMethod === "UPI") {
  try {
    const res = await axios.post(`${API_URL}/api/payment/init`, {
      amount: totalAmount,
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
            ...response,
            tempPaymentId: res.data.tempPaymentId, // link back to tempPayment
          });

          if (verifyRes.data.success) {
              alert("✅ Payment successful! Order placed.");
              setCart([]);
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
    <small>Items Total</small>
    <small>₹{itemsTotal}</small>
  </div>

  <div className="d-flex justify-content-between">
    <small>Delivery Charge</small>
    <small>₹{DELIVERY_CHARGE}</small>
  </div>

  <div className="d-flex justify-content-between mt-1">
    <small><strong>Total</strong></small>
    <small><strong>₹{total}</strong></small>
  </div>
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
  );
}
export default OrderSummary;
