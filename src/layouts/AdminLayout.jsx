import { Outlet } from "react-router-dom"
import TopNavbar from "../components/adminComponents/TopNavbar"
import SideNavbar from "../components/adminComponents/SideNavbar"
function AdminLayout(){
    return(
        <div>
            <TopNavbar/>
            <div style={{ display: "flex" }}>
                <SideNavbar />
                <main style={{ flex: 1, padding: "20px",}}>
                    <Outlet /> {/* renders AddProducts, ViewProducts, etc. */}
                </main>
            </div>
        </div>
    )
}
export default AdminLayout