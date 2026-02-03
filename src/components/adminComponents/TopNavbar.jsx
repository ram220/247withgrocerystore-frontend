import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function TopNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.clear();
          setIsLoggedIn(false);
          navigate("/login");
        } else {
          setIsLoggedIn(true);
        }
      } catch {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate("/login");
      }
    };

    checkToken();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm px-3 sticky-top"
         style={{ backgroundColor: "whitesmoke" }}>

      {/* LOGO */}
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
          src="/grocerystoreicon.jpeg"
          alt="logo"
          style={{ height: "40px", marginRight: "10px" }}
        />
        <strong style={{ color: "rgb(255, 107, 2)" }}>Admin Panel</strong>
      </Link>

      {/* HAMBURGER */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#adminNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* RIGHT CONTENT */}
      <div className="collapse navbar-collapse justify-content-end" id="adminNavbar">
        <ul className="navbar-nav align-items-center gap-3">

          {isLoggedIn ? (
            <>
              <li className="nav-item">
                <span className="fw-semibold">
                  Hi, <span style={{ color: "rgb(255, 107, 2)" }}>Admin</span>
                </span>
              </li>

              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger btn-sm"
                  style={{
                    borderColor: "rgb(255, 107, 2)",
                    color: "rgb(255, 107, 2)"
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="btn btn-outline-primary btn-sm">
                Login
              </Link>
            </li>
          )}

        </ul>
      </div>
    </nav>
  );
}

export default TopNavbar;
