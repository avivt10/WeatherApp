import { useEffect, useState } from "react";
import style from "./sideBar.module.css";
import WindIcon from "../../assets/icons/3D/windIcon3D";
import SunnyCloudyIcon from "../../assets/icons/sunnyCloudyIcon";
import FavoritesIcon from "../../assets/icons/favoritesIcon";
import { sideBarConfig } from "./config/sideBar.config";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { setChangeMode } from "../../redux/features/switchMode";
import SunnIcon from "../../assets/icons/sunIcon";
import MoonIcon from "../../assets/icons/moonIcon";


const Sidebar = () => {
  const [isLightMode, setIsLightMode] = useState<boolean>(false);
  const favorite = <FavoritesIcon />;
  const sunnyCloudyIcon = <SunnyCloudyIcon />;
  const icons = [sunnyCloudyIcon, favorite];
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setChangeMode(isLightMode))
  }, [isLightMode])

  const handleSwitchChange = () => {
    setIsLightMode((prevMode) => !prevMode);
    document.body.classList.toggle("lightMode")
  };

  return (
    <nav className={`${style.sideBarWrapper} ${isLightMode ? `${style.lightMode}` : ''}`}>
      {/*  logo */}
      <div className={style.windIcon}>
        <Link to={"/"}>
          <WindIcon width={50} height={50} />
        </Link>
      </div>

      {/* list items */}
      <ul className="nav flex-column">
        {sideBarConfig.map((item, index) => (
          <li key={index} className={style.iconsStyle}>
            <NavLink to={item.route}>
              <span className="d-flex justify-content-center align-items-center">
                {icons[item.icon]}
              </span>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}

        {/* switcher light/dark mode */}
        <li className={style.buttonSwitch}>
          <label className={style.switch}>
            <span className={`${style.sun} ${isLightMode ? 'active' : ''}`}>
              <SunnIcon />
            </span>
            <span className={`${style.moon} ${isLightMode ? 'active' : ''}`}>
              <MoonIcon />
            </span>
            <input type="checkbox" className={style.input} onChange={handleSwitchChange} />
            <span className={style.slider}></span>
          </label>
        </li>
      </ul>

    </nav>
  );
};

export default Sidebar;
