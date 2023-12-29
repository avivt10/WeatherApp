import AirConditions from "./components/airConditions"
import FullForecast from "./components/fullForecast"
import Search from "./components/search"
import WeatherWidget from "./components/weatherWidget"

const WeatherView = () => {
  return (
    <div className="w-75 m-auto">
      <div className="d-flex flex-column pt-5 p-5 mt-2">
        <Search/>
        <WeatherWidget/>
        <FullForecast/>
        <AirConditions/>
      </div>
    </div>
  )
}

export default WeatherView

