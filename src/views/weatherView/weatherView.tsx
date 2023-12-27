import AirConditions from "./components/airConditions"
import FullForecast from "./components/fullForecast"
import Search from "./components/search"
import WeatherWidget from "./components/weatherWidget"

const WeatherView = () => {
  return (
    <div>
        <Search/>
        <WeatherWidget/>
        <FullForecast/>
        <AirConditions/>
    </div>
  )
}

export default WeatherView

