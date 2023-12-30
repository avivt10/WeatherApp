import AirConditions from "./components/airConditions"
import FullForecast from "./components/fullForecast"
import Search from "./components/search"
import WeatherWidget from "./components/weatherWidget"
import style from "./weatherView.module.css"
import "./weatherView.module.css"

const WeatherView = () => {
  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.searchContainer}>
          <Search />
        </div>
        <WeatherWidget />
        <FullForecast />
        <AirConditions />
      </div>
    </>
  )
}

export default WeatherView

