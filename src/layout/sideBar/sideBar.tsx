import './sideBar.css';
import WindIcon from '../../assets/icons/3D/windIcon3D';
import SunnyCloudyIcon from '../../assets/icons/sunnyCloudyIcon';
import FavoritesIcon from '../../assets/icons/favoritesIcon';

const Sidebar = () => { 
  const favorite = <FavoritesIcon/>
  const sunnyCloudyIcon = <SunnyCloudyIcon/>
  const icons = [sunnyCloudyIcon,favorite];
  const namesIcons = ["Weather","Favorites"]
  return (
    <div className="d-flex justify-content-center flex-column">
        <WindIcon width={50} height={50} styleClass="wind-icon"/>
      <ul className="nav flex-column">
      {icons.map((item,index) => (
            <li key={index} className="icons-style">
                  <a>{item}</a> 
                  <span>{namesIcons[index]}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;