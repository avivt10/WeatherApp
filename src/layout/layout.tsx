import { Outlet } from "react-router-dom";
import SideBar from "./sideBar";

const Layout = () => {
    return (
        <div className="d-flex">
            <div className="sidebar">
                <div className="inner-sidebar">
                    <SideBar />
                </div>
            </div>
            <Outlet />
        </div>
    );
};

export default Layout;