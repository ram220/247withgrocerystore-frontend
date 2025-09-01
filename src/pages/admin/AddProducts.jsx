import { useState } from "react";
import axios from 'axios';

function AddProducts() {
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productKeywords, setProductKeywords] = useState('');

  const API_URL = "https://two47withgrocerystoreram-backend.onrender.com"; 

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      setImage({
      file,
      preview: URL.createObjectURL(file), // preview url
      })
    }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // build FormData exactly as your backend expects
    const formData = new FormData();
    formData.append("name", productName);
    formData.append("category", productCategory);
    formData.append("price", productPrice);
    // send keywords as a simple comma-separated string (backend splits it)
    formData.append("keywords", productKeywords);

    // append all selected files under the field name "images"
    if (image?.file) {
      formData.append("image", image.file);  // ✅ single image field name
    }
    const token = localStorage.getItem('token');

    try {
      // IMPORTANT: do NOT set Content-Type manually; let the browser add the boundary
      await axios.post(
        `${API_URL}/api/products`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Product Added Successfully');

      // optional: clear form
      setProductName('');
      setProductCategory('');
      setProductPrice('');
      setProductKeywords('');
      setImage(null);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "❌ Error While Adding Product");
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "20px" }}>
      <div className="p-2">
        <h5>Product Images</h5>
        <form onSubmit={handleSubmit}>
          <div className="d-flex gap-2">
              <div>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="file-upload"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px dashed #ccc",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    width: "70px",
                    height: "70px",
                    cursor: "pointer",
                    overflow: "hidden",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  {image ? (
                    <img
                      src={image.preview}
                      alt="preview"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <small style={{ color: "#666" }}>Upload</small>
                  )}
                </label>
              </div>

          </div>

          <div className="mt-2">
            <h5>Product Name</h5>
            <input
              type="text"
              placeholder="Type here"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              style={{ border: "1px solid", borderRadius: "3px", width: "230px" }}
            />
          </div>

          <div className="mt-2">
            <h5>Product Category</h5>
            <select
              style={{ width: "230px" }}
              value={productCategory}
              onChange={(e) => { setProductCategory(e.target.value) }}
            >
              <option>Select Category</option>
              <option>Oils</option>
              <option>vegetable</option>
              <option>dairy</option>
              <option>Rice</option>
            </select>
          </div>

          <div className="mt-2">
            <h5>Product Price</h5>
            <input
              type="number"
              min={0}
              value={productPrice}
              onChange={(e) => { setProductPrice(e.target.value) }}
              style={{ border: "1px solid", borderRadius: "3px", width: "230px" }}
            />
          </div>

          <div className="mt-2">
            <h5>Product Keywords</h5>
            <input
              type="text"
              placeholder="Enter comma separated keywords"
              value={productKeywords}
              onChange={(e) => { setProductKeywords(e.target.value) }}
              style={{ border: "1px solid", borderRadius: "3px", width: "230px" }}
            />
          </div>

          <button
            className="mt-3"
            type="submit"
            style={{
              padding: "8px 16px",
              marginTop: "10px",
              backgroundColor: "rgb(255, 107, 2)",
              border: "none",
              borderRadius: "3px",
              color: "white"
            }}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProducts;
