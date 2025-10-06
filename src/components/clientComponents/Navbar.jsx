import {Link,useNavigate} from 'react-router-dom';
import  {useState,useEffect} from 'react';
import { jwtDecode } from "jwt-decode";
import './Navbar.css'
function Navbar({cart,setCart,isLoggedIn,setIsUserLoggedIn}){
    const [searchQuery,setSearchQuery]=useState("");
    const navigate=useNavigate();

    const handleLogout = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("role");  
  setCart([]);
  setIsUserLoggedIn(false)
  navigate("/"); // redirect home
};

  const handelSearch=(e)=>{
    e.preventDefault();
        if(searchQuery.trim()){
            navigate(`/search?keyword=${searchQuery}`)
            setSearchQuery("");
        }
  }

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("userToken");
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // in seconds
        if (decoded.exp < currentTime) {
          handleLogout(); // token expired → log out
          alert("Session expired! Please login again.");
        }
      } catch (err) {
        handleLogout(); // invalid token → log out
      }
    };

    const interval = setInterval(checkToken, 1000); // check every second
    return () => clearInterval(interval);
  }, []);


    
    return(
        <>
            <nav className='navbar p-3'>
                <div className='logo'><Link to="/"><img src='grocerystoreicon.jpeg'/></Link></div>
                <div className='rightside'>
                    <ul className='nav-links'>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/myorders">My Orders</Link></li>
                        <li>{
                                isLoggedIn?<button onClick={handleLogout} style={{border:"none",borderRadius:"3px", backgroundColor:"rgb(252, 107, 3)"}}>Logout</button>:(<Link to="/login">Login</Link>)
                            }</li>
                    </ul>

                    <form onSubmit={handelSearch} className='search-box'>
                        <input type='text' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='search...'/>
                        <button type="submit" className='search-btn'>
                        <img className='search-icon' src="searchicon.png" alt="search"/>
                        </button>
                    </form>

                    <div className='cart'>
                        <Link to="/cart" className="cart-icon">
                        <img src="cart.png" className='cart-img'/>
                        {cart.length>0 && <span className='cart-count'>{cart.length}</span>}
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar;