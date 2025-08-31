import { useState, useEffect } from "react";
import axios from "axios";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 6; // number of products per page

  const API_URL = "https://two47withgrocery-backend.onrender.com";
  // Fetch products from backend
  const fetchProducts = async (pageNum = 1) => {
    try {
      const res = await axios.get(
        `${API_URL}/api/products?page=${pageNum}&limit=${limit}`
      );
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  // Toggle in-stock status locally
const toggleStock = async (id, currentStatus) => {
  try {
    const token = localStorage.getItem("token"); // or however you store it
    const res = await axios.put(
      `${API_URL}/api/products/${id}`,
      { inStock: !currentStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setProducts((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, inStock: res.data.inStock } : p
      )
    );
  } catch (err) {
    console.error("Toggle error:", err.response?.data || err.message);
  }
};



  return (
    <div className="p-3">
      <h5>All Products</h5>
      <div
        className="container ms-0 p-2"
        style={{
          backgroundColor: "whitesmoke",
          width: "600px",
          minHeight: "400px",
        }}
      >
        {/* Headers */}
        <div
          className="d-flex p-2"
          style={{ fontWeight: "bold", borderBottom: "1px solid #ccc" }}
        >
          <div style={{ flex: 2 }}>Product</div>
          <div style={{ flex: 1 }}>Category</div>
          <div style={{ flex: 1 }}>Price</div>
          <div style={{ flex: 1 }}>In Stock</div>
        </div>

        {/* Products */}
        {products.map((p) => (
          <div
            key={p._id}
            className="d-flex align-items-center p-2"
            style={{ borderBottom: "1px solid #eee" }}
          >
            {/* Product Image + Name */}
            <div
              style={{
                flex: 2,
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <img
                src={`${API_URL}${p.image}`}
                alt={p.name}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
              <span>{p.name}</span>
            </div>

            {/* Category */}
            <div style={{ flex: 1 }}>{p.category}</div>

            {/* Price */}
            <div style={{ flex: 1 }}>₹{p.price}</div>

            {/* In Stock toggle */}
            <div style={{ flex: 1 }}>
              <label className="switch">
                <input
                    type="checkbox"
                    checked={!!p.inStock}
                    onChange={() => toggleStock(p._id, p.inStock)}/>
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className="mt-3 d-flex justify-content-center align-items-center gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="btn btn-sm btn-primary"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="btn btn-sm btn-primary"
          >
            Next
          </button>
        </div>
      </div>

      {/* Toggle switch CSS */}
      <style>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 40px;
          height: 20px;
        }
        .switch input { display: none; }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: #ccc;
          transition: 0.4s;
          border-radius: 20px;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 16px;
          width: 16px;
          left: 2px;
          bottom: 2px;
          background-color: white;
          transition: 0.4s;
          border-radius: 50%;
        }
        input:checked + .slider { background-color: #4CAF50; }
        input:checked + .slider:before { transform: translateX(20px); }
      `}</style>
    </div>
  );
}

export default ViewProducts;
