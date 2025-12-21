import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../components/clientComponents/Footer";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  console.log("Product ID from URL:", id, id.length);
    const API_URL = "https://two47withgrocerystoreram-backend.onrender.com";
  //const API_URL = "http://localhost:5000";
  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
    fetchRecommendations();
  }, [id]);

  const fetchProduct = async () => {
    const res = await axios.get(`${API_URL}/api/products/${id}`);
    setProduct(res.data);
  };

  const fetchRecommendations = async () => {
    const res = await axios.get(
      `${API_URL}/api/products/recommend/${id}`
    );
    setRecommended(res.data);
  };

  if (!product) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container mt-4">
      {/* PRODUCT DETAILS */}
      <div className="row">
        <div className="col-md-5">
          <img
            src={`${API_URL}${product.image}`}
            className="img-fluid"
            alt={product.name}
          />
        </div>

        <div className="col-md-7">
          <h2>{product.name}</h2>
          <h4 className="text-success" style={{backgroundColor:"rgb(252, 107, 3)"}}>₹ {product.price}</h4>
          
          {/* Product Description */}
          {product.description && (
            <p className="mt-3">{product.description}</p>
          )}

          {product.inStock ? (
            <button
              className="btn btn-warning mt-3"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          ) : (
            <p className="text-danger mt-3">Out of Stock</p>
          )}
        </div>
      </div>

      {/* RECOMMENDED PRODUCTS */}
      {recommended.length > 0 && (
        <>
          <h3 className="mt-5">Recommended Products</h3>
          <div className="d-flex flex-wrap gap-4 mt-3">
            {recommended.map((r) => (
              <div
                key={r._id}
                className="card"
                style={{ width: "16rem", cursor: "pointer" }}
                onClick={() => navigate(`/product_details/${r._id}`)}
              >
                <img
                  src={`${API_URL}${r.image}`}
                  className="card-img-top"
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h6 className="text-truncate">{r.name}</h6>
                  <p>₹ {r.price}</p>
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
