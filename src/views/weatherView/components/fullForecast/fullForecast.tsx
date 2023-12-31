import axios from "axios";
import { useEffect, useState } from "react";
import style from "./fullForecast.module.css"
import SunnIcon3D from "../../../../assets/icons/3D/sunnIcon3D";
import { ICurrentCityModel } from "../../weatherView";

interface IFullForecastModel{
    iconPhrase: string;
    temperatureValue: number;
    temperatureUnit: string;
    date: string;
}

const FullForecast = ({currentCity} : ICurrentCityModel) => {
    const [data,setData] = useState<IFullForecastModel[]>()
    const fetch = async () => {
        try{
            const response = await axios.get(`http://localhost:3000/forecasts/v1/daily/5day/&apikey=${import.meta.env.VITE_APIKEY}`)
            const object = [];
            for (let i = 0; i <= 4; i++) {
                const obj = {
                iconPhrase: response.data.DailyForecasts[i].Day.IconPhrase,
                temperatureValue: response.data.DailyForecasts[i].Temperature.Maximum.Value,
                temperatureUnit: response.data.DailyForecasts[i].Temperature.Maximum.Unit,
                date:formatDate(response.data.DailyForecasts[i].Date)
                }
                object.push(obj)
            }
            setData(object)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetch()
    }, [])
    
    const formatDate = (inputDate: string): string => {
        const date = new Date(inputDate);
        const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
        return dayName;
      };
      
    return (
        <>
            <div className={style.fullForceCastContainer}>
            {
                data?.map((item) => {
                    return(
                        <div className="d-flex flex-column align-items-center">
                            <p className={style.dateStyle}> {item.date}</p>
                            <SunnIcon3D width={80} height={80}/>
                            <p className={style.temperatureStyle}> {item.temperatureValue}°{item.temperatureUnit}</p>
                        </div>
                    )
                })
            }
          </div>
        </>
    );
};

export default FullForecast;