import axios from "axios";
import { useEffect, useState } from "react";
import style from "./fullForecast.module.css";
import { useAppSelector } from "../../../../redux/hooks";
import { IAxiosDailyForecastsModel, IDailyForecastsModel } from "./models/fullForecastModel";
import getDayFromDate from "../../../../shared/functions/getDayFromDate";
import getWeatherIconByNumber from "../../../../shared/functions/getWeatherForecastIconByNumber";
import { toast } from "react-toastify";

const FullForecast = () => {
  const [foreCast, setForeCast] = useState<IDailyForecastsModel[]>();
  const { currentCity } = useAppSelector((state) => state.citySlice);
  const { unitMetric } = useAppSelector(state => state.tempUnitSlice)

  useEffect(() => {
    getFullForecast();
  }, [currentCity, unitMetric]);

  const getFullForecast = async () => {
    try {
      const { data: { DailyForecasts } } = await axios.get<IAxiosDailyForecastsModel>(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${currentCity.key}?apikey=${import.meta.env.VITE_APIKEY}&metric=${unitMetric}`
      );
      const foreCastTemp: IDailyForecastsModel[] = mapForecasts(DailyForecasts);
      setForeCast(foreCastTemp);
    } catch (err) {
      toast(String(err))
    }
  };

  const mapForecasts = (dailyForecasts: IDailyForecastsModel[]): IDailyForecastsModel[] => {
    return dailyForecasts.map(dailyForecast => {
      return {
        Date: getDayFromDate(dailyForecast.Date),
        Day: dailyForecast.Day,
        Temperature: dailyForecast.Temperature
      }
    })
  }

  return (
    <div className={style.fullForceCastContainer}>
      {foreCast?.map((item, i) => {
        return (
          <div key={i} className={`d-flex flex-column align-items-center ${style.FullForeCastStyle}`}>
            <p className={style.dateStyle}> {item.Date}</p>
            <img src={`/weather-icons/${getWeatherIconByNumber(item.Day.Icon)}`} alt={`${item.Day.IconPhrase}`} />
            <p className={style.temperatureStyle}>
              {item.Temperature.Maximum.Value}°{item.Temperature.Maximum.Unit}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default FullForecast;
