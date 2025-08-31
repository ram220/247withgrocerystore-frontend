import {Link} from 'react-router-dom' 
function TopNavbar(){
    return(
        <div>
            <nav className="navbar p-3" style={{backgroundColor:"whitesmoke"}}>
                <div className="logo">
                    <img src="/grocerystoreicon.jpeg"></img>
                </div>
                <div className="rightlinks me-5">
                    <ul className="nav-links">
                        <li><strong><h6><span style={{color:"rgb(255, 107, 2)"}}>Hi! </span>Admin</h6></strong></li>
                        <li><Link to="/login"><h6><span style={{color:"rgb(255, 107, 2)"}}>Logout</span></h6></Link></li>
                    </ul>
                </div>

            </nav>
        </div>
    )
}
export default TopNavbar;