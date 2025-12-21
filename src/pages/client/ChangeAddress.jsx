import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChangeAddress() {
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const LOCAL_URL = "http://localhost:5000";
  const API_URL = "https://two47withgrocerystoreram-backend.onrender.com";

  // Fetch current details
  useEffect(() => {
    //axios.get(`${LOCAL_URL}/api/auth/user/${userId}`)
    axios.get(`${API_URL}/api/auth/user/${userId}`)
      .then(res => {
        setAddress(res.data.address || "");
        setMobile(res.data.mobile || "");
      })
      .catch(err => console.log(err));
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //const res = await axios.put(`${LOCAL_URL}/api/auth/user/${userId}`, {
      const res = await axios.put(`${API_URL}/api/auth/user/${userId}`, {
        address,
        mobile
      });
      if (res.data.success) {
        alert("✅ Address updated successfully!");
        navigate("/cart"); // redirect back
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update address");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Update <span style={{color:"rgb(252, 107, 3)"}}>Address</span></h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Address</label>
          <textarea
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label>Mobile</label>
          <input
            type="text"
            className="form-control"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-warning" style={{backgroundColor:"rgb(252, 107, 3)"}}>Save</button>
      </form>
    </div>
  );
}

export default ChangeAddress;
