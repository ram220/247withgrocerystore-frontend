import './SideNavbar.css'
import { Link } from 'react-router-dom'
function SideNavbar(){
    return(
        <>
            <div className="sidenav p-4 " style={{backgroundColor:"whitesmoke"}}>
                <div className='back mt-3'> 
                    <Link to="/admin/addproducts"><strong><h6>Add Products</h6></strong></Link>
                </div>
                <div className='back mt-3'>
                    <Link to="/admin/viewproducts"><strong><h6>View Products</h6></strong></Link>
                </div>
                <div className='back mt-3'>
                    <Link to="/admin/vieworders"><strong><h6>View Orders</h6></strong></Link>
                </div>
                <div className='back mt-3'>
                    <Link to="/admin/profitability"><strong><h6>Profitability</h6></strong></Link>
                </div>
            </div>
        </>
    )
}
export default SideNavbar