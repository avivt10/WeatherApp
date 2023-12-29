import './Sidebar.css';
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
      {icons.map((item,id) => (
            <li key={id} className="nav-item">
              {
                id === 0 ? 
                <a className="nav-link active mb-5">{item}</a> 
                :
                <div>
                  <a className="">{item}</a> 
                </div>
              }
             
            </li>
          ))}
      </ul>
  );
};

export default Sidebar;