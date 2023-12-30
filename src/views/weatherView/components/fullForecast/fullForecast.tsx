import axios from "axios";
import { useEffect, useState } from "react";
import style from "./fullForecast.module.css"

interface IFullForecastModel{
    iconPhrase: string;
    temperatureValue: number;
    temperatureUnit: string;
    date: string;
}

const FullForecast = () => {
    const [data,setData] = useState<IFullForecastModel[]>()
    const fetch = async () => {
        try{
            const response = await axios.get("http://localhost:3001/forecasts/v1/daily/5day/&apikey=VUJwGyRzZ2R7uI16yeYeejAQuVSqplAG")
            console.log(response.data)
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
                        <div className="">
                            <p> {item.date}</p>
                            <p> {item.temperatureValue} {item.temperatureUnit}</p>
                            <p> {item.iconPhrase}</p>
                        </div>
                    )
                })
            }
          </div>
        </>
    );
};

export default FullForecast;