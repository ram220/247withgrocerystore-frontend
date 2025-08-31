import {Link} from 'react-router-dom';
import '../../pages/client/Home.css';

function Footer(){
    return(
        <div className="bg-light mt-5 text-dark">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 p-3">
                        <img width="90px" height="90px" src="grocerystoreicon.jpeg"/>
                        <p className="mt-3">Fresh, organic, and locally sourced – we bring the best fruits, veggies, dairy, and 
                            groceries straight to your doorstep.<br/> -Quality you can trust, every day!</p>
                            <p className="mt-3">© 2025 <strong><span style={{color:"rgb(255, 106, 0)"}}>Ram</span></strong>. Fresh & Organic. All rights reserved.</p>
                    </div>
                    
                    <div className="col-md-3 p-3">
                        <h4>Quick Links</h4>
                        <ul className='list-unstyled mt-3'>
                            <li className='mb-2'><Link className='text-decoration-none text-dark' to="/">Home</Link></li>
                            <li className="mb-2"><Link className='text-decoration-none text-dark' to="/products">Products</Link></li>
                            <li className="mb-2"><Link className='text-decoration-none text-dark ' to="/login">Login</Link></li>
                            <li className="mb-2"><Link className='text-decoration-none text-dark' to="/cart">Cart</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-3 p-3">
                        <h4>Contact Us</h4>
                        <ul className='list-unstyled mt-3'>
                            <li className='mb-2'><Link className='text-decoration-none text-dark' to="https://www.instagram.com/_itzz_ram_22/#">Instagram</Link></li>

                            <li className='mb-2'><Link className='text-decoration-none text-dark' to="https://www.linkedin.com/in/ramakrishna-valluru-90b733252/">LinkedIn</Link></li>
                            <li className='mb-2'><Link className='text-decoration-none text-dark' to="https://github.com/ram220">gitHub</Link></li>
                        </ul>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Footer;