import AirConditions from "./components/airConditions"
import FullForecast from "./components/fullForecast"
import Search from "./components/search"
// import DisplaySearch from "./components/search/displaySearch"
import WeatherWidget from "./components/weatherWidget"
import style from "./weatherView.module.css"

const WeatherView = () => {
  return (
    <div>
      <div className={style.searchContainer}>
        <Search/>
        {/* <DisplaySearch/> */}
      </div>
        <WeatherWidget/>
        <FullForecast/>
        <AirConditions/>
    </div>
  )
}

export default WeatherView

