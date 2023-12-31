import SunnIcon3D from "../../../../assets/icons/3D/sunnIcon3D";
import { ICurrentCityModel } from "../../weatherView";
import style from "./weatherWidget.module.css"

const WeatherWidget = ({ currentCity }: ICurrentCityModel) => {
    console.log(currentCity);

    return (
        <div className={`d-flex ${style.detailsWeather}`}>
            <div>
                <h1 className={style.cityStyle}>
                    {currentCity.city}
                </h1>
                <p>{currentCity?.country}</p>
                <p className={style.temperatureTodayStyle}>
                    {currentCity.Metric?.value}°{currentCity.Metric?.Unit}
                </p>
            </div>
            <div className={style.iconContainer}>
                <SunnIcon3D styleClass={style.icon} />
            </div>
        </div>
    );
};

export default WeatherWidget;