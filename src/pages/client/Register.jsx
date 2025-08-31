import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {

  const API_URL = "https://two47withgrocery-backend.onrender.com";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    mobile: ""
  });
  const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/api/auth/register`, formData);
      alert("Registered successfully ✅");
      navigate('/login')
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Unable to Register ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border w-25 m-auto mt-5 p-3">
        <div>
          <h3 className="text-center" style={{ color: "rgb(252, 107, 3)" }}>
            Register Here
          </h3>
        </div>

        <div className="mt-3">
          <label>Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mt-3">
          <label>Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mt-3">
          <label>Phone No.</label>
          <input
            className="form-control"
            type="number"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>

        <div className="mt-3">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mt-3">
          <label>Address</label>
          <input
            className="form-control"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="mt-3">
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ background: "rgb(252, 107, 3)" }}
          >
            Register
          </button>
        </div>
      </div>
    </form>
  );
}

export default Register;
