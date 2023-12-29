import { Outlet } from "react-router-dom";
import SideBar from "./sideBar";
import "./layout.css"
const Layout = () => {
    return (
        <div className="d-flex">
            <SideBar/>
            <Outlet />
        </div>
    );
};

export default Layout;