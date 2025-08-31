import './Home.css'
import Footer from '../../components/clientComponents/Footer';
import { Link } from 'react-router-dom';
function Home(){
    return(
        <>
        <div className="container mt-5">
            <div className="row align-items-center">
                {/* Left Side: Text */}
                <div className="col-md-6">
                <h1 className="display-4 fw-bold">
                    Tasty Organic <span style={{color:"rgb(255, 106, 0)"}}>Fruits</span> &<span style={{color:'rgb(255, 106, 0)'}}> Veggies</span> <br /> in Your City
                </h1>
                <p className="mt-3">
                    Fresh, healthy, and delivered straight to your doorstep.
                </p>
                </div>

                {/* Right Side: Image */}
                <div className="col-md-6 text-center">
                <img src="/grocery-bucket.png" alt="Fruits and Veggies"
                    className="img-fluid rounded"
                    style={{ maxHeight: "400px" }}/>
                </div>
            </div>
            
            <div>
                <h2 className="text-center mt-5"><strong><span style={{color:"rgb(255, 106, 0)"}}>Shop</span> By Category</strong></h2>
            </div>

            <div className="products-category">
                <div className="card">
                    <img src="/fruits-and-veggies.png" width="270px" height="130px" alt="Fruits & Veggies"></img>
                    <h4 className='mt-3'>Fruits & Veggies</h4>
                    <p>Fruits and vegetables provide vitamins, minerals, and fiber.</p>
                </div>
                <div className="card">
                    <img src="/dairy-and-eggs.png" width="270px" height="130px" alt="Dairy & Eggs" />
                    <h4 className='mt-3'>Dairy & Eggs</h4>
                    <p>Dairy comes from milk, while eggs are not dairy.</p>
                </div>
                <div className="card">
                    <img src="/dals.jpeg" width="270px" height="130px" alt='Dals'/>
                    <h4 className='mt-3'>Dals</h4>
                    <p>Dals and legumes provide rich protein and support healthy growth.</p>
                </div>
                <div className="card">
                    <img src="/rice and oils banner.jpg" width="270px" height="130px" alt='Dals'/>
                    <h4 className='mt-3'>Rice & Oils</h4>
                    <p>Rice provides carbohydrates for energy, while oils offer healthy fats.</p>
                    
                </div>
                <div className="card">
                    <img src="/masalas-powders.jpg" width="270px" height="130px" alt='Dals'/>
                    <h4 className='mt-3'>Spice Blend</h4>
                    <p>Spices and masalas enhance the taste, enrich the aroma, and aid in better digestion.</p>
                    
                </div>

                

            </div>

            <div>
                <Footer/>
            </div>
        </div>
        </>
    )
}
export default Home;