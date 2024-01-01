import StarIcon from "../../../../assets/icons/starIcon";
import { onAddFavorite, onDeleteFavorite } from "../../../../redux/features/favoriteSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { favoritePropsModel } from "../../../../redux/models/favorite.model";
import { ISearchModel } from "../search/models/search.model";
import style from "./weatherWidget.module.css";
import { ICurrentCityModel } from './../../models/currentCityModel';
import getWeatherIconByNumber from "../fullForecast/functions/getWeatherForecastIconByNumber";


const WeatherWidget = ({ currentCity }: ICurrentCityModel) => {
  const onChangeMode = useAppSelector((state) => state.switchModeSlice.onChangeMode);
  const { favorites } = useAppSelector((state) => state.favoriteSlice);
  const dispatch = useAppDispatch();

  const toggleFavorite = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    city: ISearchModel
  ) => {
    
    event.stopPropagation();
    if (favorites.some((favorite) => favorite.key === city.key)) {
      // remove from state
      dispatch(onDeleteFavorite({ Key: city.key }));
    } else {
      addNewCity(city);
    }
  };

  const addNewCity = (city: ISearchModel) => {
    const newFavorite: favoritePropsModel = {
      key: city.key,
      cityName: city.city || "",
      countryName: city.country || "",
    };
    dispatch(onAddFavorite(newFavorite));
  };
  
  return (
    <div className={`d-flex ${ onChangeMode ? style.detailsWeatherLight : style.detailsWeather}`}>
      <div>
        <div onClick={(e) => toggleFavorite(e, currentCity)}>
        <StarIcon width={40} height={40} color={favorites.some((favorite) => favorite.key === currentCity.key)
          ? "#ffdd00"
          : "#828a93"
        }/>
      </div>
        <h1 className={style.cityStyle}>{currentCity.city}</h1>
        <p>{currentCity?.country}</p>
        <p className={style.temperatureTodayStyle}>
          {currentCity.Metric?.Value}°{currentCity.Metric?.Unit}
        </p>
      </div>
      <div className={style.iconContainer}>
      <img className={style.iconImage} src={`/src/assets/weather-icons/${getWeatherIconByNumber(currentCity?.weatherIcon || 1)}`} />
      </div>
    </div>
  );
};

export default WeatherWidget;
