import { useState, useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import axios from "axios";

function SearchedPage({ addToCart }) {
  const [searchedItems, setSearchedItems] = useState([]);
  const location = useLocation();

  const navigate=useNavigate();

  // extract ?keyword=value
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");

  //const API_URL = "https://two47withgrocerystoreram-backend.onrender.com";
    const API_URL = "http://localhost:5000";


  useEffect(() => {
    if (!keyword) return;

    axios
      .get(`${API_URL}/api/products/search?keyword=${keyword}`)
      .then((res) => {
        console.log("Search Results 👉", res.data);
        setSearchedItems(res.data.products || []);
      })
      .catch((err) => console.error(err));
  }, [keyword]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">
        Search Results for <span style={{ color: "rgb(252, 107, 3)" }}>"{keyword}"</span>
      </h3>

      <div className="row">
        {searchedItems.length > 0 ? (
          searchedItems.map((item) => (
            <div key={item._id} className="col-md-3 mb-3">
              <div className="card" style={{ width: "18rem", height: "22rem" }}>
                {/* + Button */}
                <button
                  disabled={!item.inStock}
                  className="plus-btn"
                  onClick={() => addToCart(item)}
                  title={item.inStock ? "Add to cart" : "Out of stock"}
                >
                  +
                </button>

                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top"
                  style={{ height: "180px", objectFit:"fill" }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate">{item.name}</h5>
                  <p className="card-text">₹{item.price}</p>

                  {/* Shop Now / Out of Stock */}
                  {item.inStock ? (
                    <small
                    onClick={() => navigate(`/product_details/${item._id}`)}
                      style={{
                        border: "none",
                        borderRadius: "3px",
                        backgroundColor: "rgb(252, 107, 3)",
                        color: "white",
                        width: "100px",
                        height: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "bold",
                        cursor:"pointer"
                      }}
                    >
                      view more
                    </small>
                  ) : (
                    <small
                      style={{
                        border: "none",
                        borderRadius: "3px",
                        backgroundColor: "rgba(252, 3, 3, 1)",
                        color: "white",
                        width: "100px",
                        height: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Out of Stock
                    </small>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="d-flex justify-content-center align-items-center w-100" style={{ height: "50vh" }}>
            <h4>No products found for "{keyword}"</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchedPage;
