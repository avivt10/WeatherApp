import FullForecast from "./components/fullForecast";
import Search from "./components/search";
import WeatherWidget from "./components/weatherWidget";
import "./weatherView.module.css";

const WeatherView = () => {
  return (
    <>
      <Search />
      <WeatherWidget />
      <FullForecast />
    </>
  );
};

export default WeatherView;
