import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Register from "./Register";
import axios from 'axios'
import { getCart } from "../../services/cartServices"; // ✅ import cart service
function Login({setIsUserLoggedIn,setIsAdminLoggedIn,setCart}){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [errors,setErrors]=useState({
        email:"",
        password:""
    })
    const navigate=useNavigate();
    
    const regex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const API_URL = "https://two47withgrocerystoreram-backend.onrender.com";

    const handleSubmit=async ()=>{
        const newErrors={email:"",password:""};
        if(email.trim()===""){
            newErrors.email="Please Enter Email";
        }
        else if(!regex.test(email)){
            newErrors.email="invalid email"
        }
        else{
            newErrors.email=""
        }
        if(password.trim()===""){
            newErrors.password="Please Enter Password"
        }
        else if(password.length<5){
            newErrors.password="password length must be grater than 5 chars"
        }
        else{
            newErrors.password=""
        }

        setErrors(newErrors)
        
       if(newErrors.email || newErrors.password) return;

       try {
     //const res = await axios.post(`${API_URL}/api/auth/login`, {
        const res = await axios.post(`http://localhost:5000/api/auth/login`, {
        email,
        password,
      });

      const { token, user } = res.data;

  if (user.role === "admin") {
    // ✅ Admin login
    localStorage.setItem("adminToken", token);
    localStorage.setItem("adminId", user._id);
    localStorage.setItem("role", "admin");
    setIsAdminLoggedIn(true);
    alert("Admin Login Successful");
    navigate("/admin/addproducts");
  } else {
    // ✅ User login
    localStorage.setItem("userToken", token);
    localStorage.setItem("userId", user._id);
    localStorage.setItem("address", user.address);
    localStorage.setItem("role", "user");
    setIsUserLoggedIn(true);

    alert("User Login Successful");
    // Fetch cart immediately after login
    const cartData = await getCart(user._id,token);
    setCart(cartData.items || []);
    navigate("/");
        }
    }
    catch(err){
    console.error(err);
        alert(err.response?.data?.message || "Login failed ❌");
       }
    }

    

    return(
        <>
        <form onSubmit={(e)=>{e.preventDefault();handleSubmit()}}>
            <div className="border w-25 p-3 m-auto mt-5">
                <h2 className="text-center" style={{color:"rgb(252, 107, 3)"}}>Login Here</h2>
                <div className='mt-3'>
                    <label>Email</label><br/>
                    <input className='form-control' type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    {errors.email&&<span className="text-danger">{errors.email}</span>}
                </div>

                <div className='mt-3'>
                    <label>Password</label>
                    <input className='form-control' type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
                    {errors.password&&<span className="text-danger">{errors.password}</span>}
                </div>

                <div className='mt-3'>
                    <button type='submit' className="btn btn-danger w-100" style={{background:"rgb(252, 107, 3)"}}>Login</button>
                </div>
                <p className="p-reg">Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </form>
        </>
    )
}
export default Login;