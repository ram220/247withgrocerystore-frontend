import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../client/Products.css';
function Offers() {
  const [offers, setOffers] = useState([]);
  const navigate = useNavigate();

  const API_URL = "https://two47withgrocerystoreram-backend.onrender.com";
  //const API_URL = "http://localhost:5000";


  useEffect(() => {
    axios.get(`${API_URL}/api/products/offers`)
      .then(res => setOffers(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2 className="text-center mt-3">
        <strong>
          <span style={{ color: "rgb(255, 106, 0)" }}>Special</span> Offers 🔥
        </strong>
      </h2>

      <div className="products-grid mt-4">
        {offers.map(p => {
          const discountedPrice =
            p.offerType === "DISCOUNT"
              ? Math.round(p.price - (p.price * p.discountPercentage) / 100)
              : p.price;

          return (
            <div className="product-card" key={p._id} style={{ width: "18rem", height: "22rem" }}>
              
              {/* OFFER BADGE */}
              <span
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  backgroundColor: "red",
                  color: "white",
                  padding: "4px 8px",
                  fontSize: "12px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  zIndex: 1,
                }}
              >
                {p.discountPercentage}% OFF
              </span>

              <img
                src={`${API_URL}${p.image}`}
                className="product-img"
                style={{ height: "180px", objectFit: "cover" }}
                alt={p.name}
              />

              <div className="card-body d-flex flex-column">
                <h4 className="card-title text-truncate">{p.name}</h4>

                {/* PRICE */}
                <h5 className="price">
                  <del style={{ color: "gray", marginRight: "6px" }}>
                    ₹{p.price}
                  </del>
                  ₹{discountedPrice}
                </h5>

                {/* VIEW BUTTON */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "auto",
                  }}
                >
                  <small
                    onClick={() => navigate(`/product_details/${p._id}`)}
                    style={{
                      borderRadius: "3px",
                      backgroundColor: "rgb(252, 107, 3)",
                      color: "white",
                      width: "100px",
                      height: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    view more
                  </small>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Offers;
