import React, { useEffect, useState } from "react";
import StarIcon from "../../../../assets/icons/starIcon";
import style from "./favoriteItem.module.css";
import axios from "axios";
import { onDeleteFavorite } from "../../../../redux/features/favoriteSlice";
import { useDispatch } from "react-redux";
import { FavoritesItemProps } from "./models/favoritesItemProps";
import getWeatherIconByNumber from "../../../../shared/functions/getWeatherForecastIconByNumber";
import { toast } from "react-toastify";
import { onChangeCurrentCity } from "../../../../redux/features/citySlice";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../../redux/hooks";

const FavoriteItem = ({ favorite }: FavoritesItemProps) => {
  const [temperatureValue, setTemperatureValue] = useState();
  const [weatherIcon, setWeatherIcon] = useState<number>(0);
  const [temperatureUnit, setTemperatureUnit] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { unitMetric } = useAppSelector((state) => state.tempUnitSlice);

  useEffect(() => {
    const getCurrentConditions = async () => {
      try {
        const { data } = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${favorite.key}?apikey=${import.meta.env.VITE_APIKEY}`);
        setTemperatureValue(
          unitMetric
            ? data[0].Temperature.Metric.Value
            : data[0].Temperature.Imperial.Value
        );
        setTemperatureUnit(
          unitMetric
            ? data[0].Temperature.Metric.Unit
            : data[0].Temperature.Imperial.Unit
        );
        setWeatherIcon(data[0].WeatherIcon)
      } catch (err) {
        toast(err as string)
      }
    }
    getCurrentConditions();
  }, []);


  const removeCityFromFavorites = (key: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete the city from favorites?");
    if (isConfirmed) {
      dispatch(onDeleteFavorite({ Key: key }));
    }
  }

  const chooseCurrentCity = () => {
    dispatch(onChangeCurrentCity({
      currentCity: {
        city: favorite.cityName,
        country: favorite.countryName,
        key: favorite.key
      }
    }))
    navigate("/")
  };

  return (
    <div className={style.favoriteWrapper}>
      {temperatureValue && (
        <React.Fragment>
          <div
            className={style.starIconStyle}
            onClick={() => removeCityFromFavorites(favorite.key)}
          >
            <StarIcon color="#ffdd00" />
          </div>
          <div className={style.favoriteCard} onClick={() => chooseCurrentCity()}>
            <h3 className="mt-4">{favorite.cityName}</h3>
            <img src={`/weather-icons/${getWeatherIconByNumber(weatherIcon)}`} className={style.favoriteIcon} alt={`${weatherIcon}`} />
            <h4 className={style.temperatureStyle}>
              {temperatureValue}°{temperatureUnit}
            </h4>
          </div>
        </React.Fragment>
      )
      }
    </div>
  );
};

export default FavoriteItem;
