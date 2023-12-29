import './Sidebar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import StarIcon from '../../assets/icons/star';
import WeatherIcon from '../../assets/icons/weather';
import WindIcon from '../../assets/icons/wind';

const Sidebar = () => {
  const wind = <WindIcon/>
  const favorite = <StarIcon/>
  const weather = <WeatherIcon/>
  const icons = [wind,favorite,weather];

  return (
      <ul className="nav flex-column">
      {icons.map((el) => (
            <li className="nav-item mb-5">
              <a className="nav-link active">{el}</a>
            </li>
          ))}
      </ul>
  );
};

export default Sidebar;