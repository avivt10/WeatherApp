import './sideBar.css';
import WindIcon from '../../assets/icons/3D/windIcon3D';
import SunnyCloudyIcon from '../../assets/icons/sunnyCloudyIcon';
import FavoritesIcon from '../../assets/icons/favoritesIcon';

const Sidebar = () => {
  const wind = <WindIcon/>
  const favorite = <FavoritesIcon/>
  const weather = <SunnyCloudyIcon/>
  const icons = [wind,favorite,weather];
  const arr = ["wind","Favorites","Weather"]
  return (
      <ul className="nav flex-column">
      {icons.map((item,id) => (
            <li key={id} className="nav-item">
              {
                id === 0 ? 
                <div className="d-flex m-auto justify-content-center mb-5">{item}
                </div> 
                :
                <div>
                  <a className="">{item}</a> 
                  <span className="sidebar-title">{arr[id]}</span>
                </div>
              }
             
            </li>
          ))}
      </ul>
  );
};

export default Sidebar;