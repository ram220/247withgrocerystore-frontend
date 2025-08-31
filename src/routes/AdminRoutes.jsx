import { BrowserRouter,Route,Routes} from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import SideNavbar from "../components/adminComponents/SideNavbar";
import AddProducts from "../pages/admin/AddProducts";

function AdminRoutes(){
    return(
            <Routes>
                <Route path="/admin/addproducts" element={<AdminLayout/>}>
                    <Route path="addproducts" element={<AddProducts/>}/>

                </Route>
            </Routes>
    )
}
export default AdminRoutes;