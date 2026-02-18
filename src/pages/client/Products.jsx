import './Products.css'
import {useEffect, useState} from 'react'
import axios from 'axios';
import Footer from '../../components/clientComponents/Footer'
import { useNavigate } from 'react-router-dom';
function Products({addToCart}){

  const navigate = useNavigate();

    /*const products=[
        {id:1,name:"banana",category:"fruits",price:10,image:"banana.png"},
        {id:2,name:"broccoli",category:"vegetables",price:50,image:"broccoli.png"},
        {id:3,name:"butter",category:"dairy",price:50,image:"butter.png"},
        {id:4,name:"beef",category:"non-veg",price:50,image:"beef.png"},
        {id:5,name:"pineapple",category:"fruits",price:50,image:"pineapple.png"},
        {id:6,name:"cabbage",category:"vegetables",price:50,image:"cabbage.png"},
        {id:7,name:"cheese",category:"dairy",price:50,image:"cheese.png"},
        {id:8,name:"eggs",category:"non-veg",price:50,image:"eggs.png"},
        {id:9,name:"grapes",category:"fruits",price:50,image:"grapes.png"},
        {id:10,name:"milk",category:"Dairy",price:50,image:"milk.png"},
        {id:11,name:"eggplant",category:"vegetables",price:50,image:"eggplant.png"},
        {id:12,name:"fish",category:"non-veg",price:50,image:"tilapia.png"},
        {id:13,name:"kiwi",category:"fruits",price:50,image:"kiwi.png"},
        {id:14,name:"slice-cheese",category:"dairy",price:50,image:"slice-cheese.png"},
        {id:15,name:"Yogurt",category:"dairy",price:50,image:"yogurt.png"},
        {id:16,name:"chicken",category:"non-veg",price:50,image:"chicken-breast.png"},
        
    ]
    <img  src={`http://localhost:5000${p.image}`} className='card-img-top' style={{ height: "180px", objectFit: "cover" }}/>

    <img  src={`${API_URL}${p.image}`} className='card-img-top' style={{ height: "180px", objectFit: "cover" }}/>    
    */

        const [products,setProducts]=useState([]);


  //const API_URL = "https://two47withgrocerystoreram-backend.onrender.com";
    const API_URL = "http://localhost:5000";


   useEffect(() => {
  axios.get(`${API_URL}/api/products?page=1&limit=1000`) // fetch all products
    .then(res => {
      setProducts(res.data.products); // ✅ set only the array
    })
    .catch(err => console.log(err));
}, []);


    const [selectedProducts,setSelectedProducts]=useState("all")
    const filteredProducts= selectedProducts==="all"?products:products.filter((p)=>p.category===selectedProducts)


    return(
      <div>
          <h2 className="text-center mt-3"> <strong><span style={{color:"rgb(255, 106, 0)"}}>Our</span> Products</strong></h2>
          <div className="products-filter mt-3">
            <button className="products-btn" onClick={()=>{setSelectedProducts("all")}}>All</button>
            <button className="products-btn" onClick={()=>{setSelectedProducts('Oils')}}>Oils</button>
            <button className="products-btn" onClick={()=>{setSelectedProducts("vegetables")}}>Vegetables</button>
            <button className="products-btn" onClick={()=>{setSelectedProducts("dairy")}}>Dairy</button>
            <button className="products-btn" onClick={()=>{setSelectedProducts("Rice")}}>Rice Packets</button>
            <button className="products-btn" onClick={()=>{setSelectedProducts("Dals")}}>Dals</button>
            <button className="products-btn" onClick={()=>{setSelectedProducts("spices")}}>Spices & Seasonings</button>

          </div>
          <div className='products-grid mt-4'>
              {
                filteredProducts.map((p)=>(<div className='product-card' key={p._id}>
                <button disabled={!p.inStock} className='plus-btn' onClick={()=>addToCart(p)} title={p.inStock ? "Add to cart" : "Out of stock"}>+</button>
                <img  src={`${p.image}`} className='product-img' alt={p.name}/>
                <div className='card-body d-flex flex-column'>
                  <h4 className='text-center'>{p.name}</h4>
                  <h5 className="text-center">
                      {p.isOffer ? (
                      <>
                        <span style={{ textDecoration: "line-through", color: "gray" }}>
                          ₹{p.price}
                        </span>{" "}
                        <span style={{ color: "green", fontWeight: "bold" }}>
                          ₹{Math.round(p.price - (p.price * p.discountPercentage) / 100)}
                        </span>
                      </>
                      ) : (
                      <>₹ {p.price}</>
                        )}
                  </h5>                  
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
                    {
                      p.inStock?(<small
                      onClick={() => navigate(`/product_details/${p._id}`)}
                      style={{
                      border: 'none',
                      borderRadius: '3px',
                      backgroundColor: 'rgb(252, 107, 3)',
                      color: 'white',
                      width: '100px',
                      height: '30px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontWeight: 'bold',
                      cursor:'pointer'
                      }}>
                      view more</small>):
                      (<small
                        style={{
                          border: 'none',
                          borderRadius: '3px',
                          backgroundColor: 'rgba(252, 3, 3, 1)',
                          color: 'white',
                          width: '100px',
                          height: '30px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontWeight: 'bold',
                        }}>Out of stock</small>)}
                    </div>
                  </div>
                </div>))
              }
          </div>


        
          <Footer/>
        </div>

    )
}
export default Products;