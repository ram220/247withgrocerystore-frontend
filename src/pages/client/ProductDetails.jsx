import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/clientComponents/Footer";
import './ProductDetails.css'
import { useParams, useNavigate } from "react-router-dom";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  console.log("Product ID from URL:", id, id.length);


  //const API_URL = "https://two47withgrocerystoreram-backend.onrender.com";
  const API_URL = "http://localhost:5000";


  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);

  const navigate = useNavigate();

    useEffect(() => {
      const fetchProduct = async () => {
        const res = await axios.get(`${API_URL}/api/products/${id}`);
        setProduct(res.data);
      };

      const fetchRecommendations = async () => {
        const res = await axios.get(`${API_URL}/api/products/recommend/${id}`);
        setRecommended(res.data);
      };

      fetchProduct();
      fetchRecommendations();
    }, [id, API_URL]); // ✅ now dependencies are correct


  

  if (!product) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-4">
      {/* PRODUCT DETAILS */}
      <div className="row">
        <div className="col-md-5">
          <img
            src={product.image}
            className="img-fluid"
            alt={product.name}
          />
        </div>

        <div className="col-md-7">
          <h2>{product.name}</h2>
          <h4 className="text-success">
                      ₹{" "}
                      {product.isOffer
                        ? Math.round(
                          product.price -
                          (product.price * product.discountPercentage) / 100
                        )
                        : product.price}

                      {product.isOffer && (
                        <span
                          style={{
                          marginLeft: "10px",
                          textDecoration: "line-through",
                          color: "gray",
                          fontSize: "16px",
                          }}>
                          ₹{product.price}
                        </span>
                      )}
          </h4>
          
          {/* Product Description */}
          {product.description && (
            <p className="mt-3">{product.description}</p>
          )}

          {product.inStock ? (
  product.unit === "KG" ? (
    <div className="mt-3">
      <button
        className="btn btn-outline-secondary btn-sm me-2"
        onClick={() => addToCart(product,1, 0.25)}
      >
        250 g
      </button>

      <button
        className="btn btn-outline-secondary btn-sm me-2"
        onClick={() => addToCart(product,1, 0.5)}
      >
        500 g
      </button>

      <button
        className="btn btn-secondary btn-sm"
        style={{ backgroundColor: "rgb(252, 107, 3)" }}
        onClick={() => addToCart(product,1, 1)}
      >
        1 Kg
      </button>
    </div>
  ) : (
    <button
      className="btn btn-secondary btn-sm mt-3"
      style={{ backgroundColor: "rgb(252, 107, 3)" }}
      onClick={() => addToCart(product, 1)}
    >
      Add to Cart
    </button>
  )
) : (
  <p className="text-danger mt-3">Out of Stock</p>
)}

        </div>
      </div>

      {/* RECOMMENDED PRODUCTS */}
      {recommended.length > 0 && (
        <>
          <h3 className="mt-5">Recommended Products</h3>
          <div className="recommended-grid mt-3">
            {recommended.map((r) => (
              <div
                key={r._id}
                className="card"
                style={{ width: "16rem", cursor: "pointer" }}
                onClick={() => navigate(`/product_details/${r._id}`)}
              >
                <div className="recommended-img-wrapper">
                    <img
                        src={r.image}
                        alt={r.name}
                    />
                  </div>

                <div className="card-body text-center">
                  <h6 className="text-truncate">{r.name}</h6>
                  <p>₹{" "}
                    {r.isOffer ? Math.round(r.price - (r.price * r.discountPercentage) / 100)
                                : r.price} </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}

export default ProductDetails;
