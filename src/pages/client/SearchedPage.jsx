import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function SearchedPage({ addToCart }) {
  const [searchedItems, setSearchedItems] = useState([]);
  const location = useLocation();

  // extract ?keyword=value
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("keyword");

  const API_URL = "https://two47withgrocery-backend.onrender.com"
  useEffect(() => {
    if (!keyword) return;

    axios
      .get(`${API_URL}/api/products/search?keyword=${keyword}`)
      .then((res) => {
        console.log("Search Results 👉", res.data);
        setSearchedItems(res.data.products);
      })
      .catch((err) => console.error(err));
  }, [keyword]);

  return (
    <div className="container mt-4">
      <div className="row">
        {searchedItems.length > 0 ? (
          searchedItems.map((item) => (
            <div key={item._id} className="col-md-3 mb-3">
              <div className="card" style={{ width: "18rem", height: "22rem" }}>
                {/* + Button */}
                <button className="plus-btn" onClick={() => addToCart(item)}>
                  +
                </button>

                <img
                  src={`${API_URL}${item.image}`}
                  alt={item.name}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate">{item.name}</h5>
                  <p className="card-text">₹{item.price}</p>
                  <button className="shopnow-btn">Shop Now</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h4>No products found for "{keyword}"</h4>
        )}
      </div>
    </div>
  );
}

export default SearchedPage;
