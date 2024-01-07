import { Outlet } from "react-router-dom";
import SideBar from "./sideBar";
import style from "./layout.module.css";

const Layout = () => {
  return (
    <div className="d-flex">
      {/* side bar */}
      <div className={style.sideBarContainer}>
        <SideBar />
      </div>

      {/* outlet */}
      <div className={`container ${style.outletContainer}`}>
        <Outlet />
      </div>
      <></>
    </div>
  );
};

export default Layout;
