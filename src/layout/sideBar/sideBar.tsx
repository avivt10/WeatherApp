import "./sideBar.css";
import WindIcon from "../../assets/icons/3D/windIcon3D";
import SunnyCloudyIcon from "../../assets/icons/sunnyCloudyIcon";
import FavoritesIcon from "../../assets/icons/favoritesIcon";
import { sideBarConfig } from "./config/sideBar.config";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const favorite = <FavoritesIcon />;
  const sunnyCloudyIcon = <SunnyCloudyIcon />;
  const icons = [sunnyCloudyIcon, favorite];

  return (
    <nav className="side-bar-wrapper">
      <div className="wind-icon">
        <WindIcon width={50} height={50} />
      </div>
      <ul className="nav flex-column">
        {sideBarConfig.map((item, index) => (
          <li key={index} className="icons-style">
            <NavLink to={item.route}>
              <span className="d-flex justify-content-center align-items-center">
                {icons[item.icon]}
              </span>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
