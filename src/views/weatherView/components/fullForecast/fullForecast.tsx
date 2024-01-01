import axios from "axios";
import { useEffect, useState } from "react";
import style from "./fullForecast.module.css";
import { useAppSelector } from "../../../../redux/hooks";
import { IFullForecastModel } from "./models/fullForecastModel";
import getDayFromDate from "./functions/getDayFromDate";
import getWeatherIconByNumber from "./functions/getWeatherForecastIconByNumber";
import { toast } from "react-toastify";

const FullForecast = () => {
  const [data, setData] = useState<IFullForecastModel[]>();
  const { currentCity } = useAppSelector((state) => state.citySlice);

  const fetch = async () => {
    try {
      const response = await axios.get(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${currentCity.key}?apikey=${import.meta.env.VITE_APIKEY}&metric=true`
      );
      const object = [];
      for (let i = 0; i <= 4; i++) {
        const obj = {
          numberIcon: response.data.DailyForecasts[i].Day.Icon,
          iconPhrase: response.data.DailyForecasts[i].Day.IconPhrase,
          temperatureValue:
            response.data.DailyForecasts[i].Temperature.Maximum.Value,
          temperatureUnit:
            response.data.DailyForecasts[i].Temperature.Maximum.Unit,
          date: getDayFromDate(response.data.DailyForecasts[i].Date),
        };

        object.push(obj);
      }
      setData(object);
    } catch (err) {
      toast(String(err))
    }
  };

  useEffect(() => {
    fetch();
  }, [currentCity]);
  
  return (
    <>
      <div className={style.fullForceCastContainer}>
        {data?.map((item) => {
          return (
            <div className={`d-flex flex-column align-items-center ${style.FullForeCastStyle}`}>
              <p className={style.dateStyle}> {item.date}</p>
              <img src={`/src/assets/weather-icons/${getWeatherIconByNumber(item.numberIcon)}`} className={style.imageIcon} alt={`${item.numberIcon}`} />
              <p className={style.temperatureStyle}>
                {" "}
                {item.temperatureValue}°{item.temperatureUnit} 
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FullForecast;
