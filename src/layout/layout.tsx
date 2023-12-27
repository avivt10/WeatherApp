import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./sideBar";

const Layout = () => {
    return (
        <React.Fragment>
            <SideBar/>
            <Outlet />
        </React.Fragment>
    );
};

export default Layout;