import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

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
        // check if token expired
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.clear();
          setIsLoggedIn(false);
          navigate("/login");
        } else {
          setIsLoggedIn(true);
        }
      } catch (err) {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate("/login");
      }
    };

    checkToken();

    // optional: check every second
    const interval = setInterval(checkToken, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    alert("session expired, please login again!")
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar p-3" style={{ backgroundColor: "whitesmoke" }}>
        <div className="logo">
          <img src="/grocerystoreicon.jpeg" alt="logo" />
        </div>
        <div className="rightlinks me-5">
          <ul className="nav-links">
            {isLoggedIn ? (
              <>
                <li>
                  <strong>
                    <h6>
                      <span style={{ color: "rgb(255, 107, 2)" }}>Hi! </span>
                      Admin
                    </h6>
                  </strong>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "rgb(255, 107, 2)" }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">
                  <h6>
                    <span style={{ color: "rgb(255, 107, 2)" }}>Login</span>
                  </h6>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default TopNavbar;
