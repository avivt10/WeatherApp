import { Outlet } from "react-router-dom";
import SideBar from "./sideBar";
import "./layout.css";
const Layout = () => {
  return (
    <div className="d-flex">
      {/* side bar */}
      <div className="side-bar-container">
        <SideBar />
      </div>

      {/* outlet */}
      <div className="container outlet-container">
        <Outlet />
      </div>
      <></>
    </div>
  );
};

export default Layout;
