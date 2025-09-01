import './Products.css'
import {useEffect, useState} from 'react'
import axios from 'axios';
import Footer from '../../components/clientComponents/Footer'
function Products({addToCart}){
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
        
    ]*/

        const [products,setProducts]=useState([]);
  const API_URL = "https://two47withgrocerystoreram-backend.onrender.com";
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
        <div className="d-flex gap-3 justify-content-center mt-3">
            <button className="products-btn" onClick={()=>{setSelectedProducts("all")}}>All</button>
            <button className="products-btn" onClick={()=>{setSelectedProducts('Oils')}}>Oils</button>
            <button className="products-btn" onClick={()=>{setSelectedProducts("vegetables")}}>Vegetables</button>
            <button className="products-btn" onClick={()=>{setSelectedProducts("dairy")}}>Dairy</button>
            <button className="products-btn" onClick={()=>{setSelectedProducts("Rice")}}>Rice Packets</button>
            <button className="products-btn" onClick={()=>{setSelectedProducts("Spices")}}>Spice Blend</button>

        </div>
        <div className='d-flex flex-wrap justify-content-center gap-5 mt-4'>
                {
                    filteredProducts.map((p)=>(<div className='card' key={p._id} style={{ width: "18rem", height:"22rem"}}>
                        <button disabled={!p.inStock} className='plus-btn' onClick={()=>addToCart(p)} title={p.inStock ? "Add to cart" : "Out of stock"}>+</button>
                        <img  src={`${API_URL}${p.image}`} className='card-img-top' style={{ height: "180px", objectFit: "cover" }}/>
                        <div className='card-body d-flex flex-column'>
                            <h4 className='card-title text-truncate'>{p.name}</h4>
                            <h5 className='price'>₹ {p.price}</h5>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px 0' }}>
  {
    p.inStock?(<small
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
    }}
  >
    Shop Now
  </small>):(<small
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
    }}
  >
    Out of stock
  </small>)
  }
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