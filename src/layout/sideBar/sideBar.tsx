import './Sidebar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import weather from "./../../assets/icons/weather.svg"
import favorite from "./../../assets/icons/star.svg"
import wind from "./../../assets/icons/wind.svg"

const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className="inner-sidebar">
      <ul className="nav flex-column">
        <li className="nav-item mb-5">
          <a className="nav-link active">
            <img src={wind}/>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link">
            <img src={favorite}/>
            <p className="text-white"> Favorites </p>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link">
          <img src={weather}/>
          <p className="text-white"> Weather </p>
          </a>
        </li>
      </ul>
        </div>
    </div>
  );
};

export default Sidebar;