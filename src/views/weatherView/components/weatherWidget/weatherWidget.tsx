import axios from "axios";
import { useEffect, useState } from "react";
import SunnIcon3D from "../../../../assets/icons/3D/sunnIcon3D";
import style from "./weatherWidget.module.css"

interface IWeatherWidgetModel {
    weatherText: string;
    temperatureValue: number;
    temperatureUnit: string;
}
const WeatherWidget = () => {
    const [data, setData] = useState<IWeatherWidgetModel>()
    const fetch = async () => {
        try {
            const response = await axios.get("http://localhost:3001/currentconditions/v1/&apikey=VUJwGyRzZ2R7uI16yeYeejAQuVSqplAG")
            const obj = {
                weatherText: response.data[0].WeatherText,
                temperatureValue: response.data[0].Temperature.Metric.Value,
                temperatureUnit: response.data[0].Temperature.Metric.Unit
            }
            setData(obj)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetch()
    }, [])
    return (
        <div className={`d-flex ${style.detailsWeather}`}>
            <div>
                <h1 className={style.cityStyle}>Jerusalem</h1>
                <p>{data?.weatherText}</p>
                <p className={style.temperatureTodayStyle}>{data?.temperatureValue}°{data?.temperatureUnit} </p>
            </div>
            <div className={style.iconContainer}>
                <SunnIcon3D styleClass={style.icon} />
            </div>
        </div>
    );
};

export default WeatherWidget;