import axios from "axios";
import { useEffect, useState } from "react";
import style from "./fullForecast.module.css";
import { useAppSelector } from "../../../../redux/hooks";
import { IFullForecastModel } from "./models/fullForecastModel";
import getDayFromDate from "../../../../shared/functions/getDayFromDate";
import getWeatherIconByNumber from "../../../../shared/functions/getWeatherForecastIconByNumber";
import { toast } from "react-toastify";

const FullForecast = () => {
  const [data, setData] = useState<IFullForecastModel[]>();
  const { currentCity } = useAppSelector((state) => state.citySlice);

  const getFullForecast = async () => {
    try {
      const { data } = await axios.get(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${currentCity.key}?apikey=${import.meta.env.VITE_APIKEY}&metric=true`
      );
      const object = [];
      for (let i = 0; i <= 4; i++) {
        const obj = {
          numberIcon: data.DailyForecasts[i].Day.Icon,
          iconPhrase: data.DailyForecasts[i].Day.IconPhrase,
          temperatureValue:
            data.DailyForecasts[i].Temperature.Maximum.Value,
          temperatureUnit:
            data.DailyForecasts[i].Temperature.Maximum.Unit,
          date: getDayFromDate(data.DailyForecasts[i].Date),
        };
        object.push(obj);
      }
      setData(object);
    } catch (err) {
      toast(String(err))
    }
  };

  useEffect(() => {
    getFullForecast();
  }, [currentCity]);

  return (
    <div className={style.fullForceCastContainer}>
      {data?.map((item, i) => {
        return (
          <div key={i} className={`d-flex flex-column align-items-center ${style.FullForeCastStyle}`}>
            <p className={style.dateStyle}> {item.date}</p>
            <img src={`/src/assets/weather-icons/${getWeatherIconByNumber(item.numberIcon)}`} alt={`${item.numberIcon}`} />
            <p className={style.temperatureStyle}>
              {item.temperatureValue}°{item.temperatureUnit}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default FullForecast;
