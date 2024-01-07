import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import FullForecast from "./components/fullForecast";
import Search from "./components/search";
import WeatherWidget from "./components/weatherWidget";
import React, { useEffect, useState } from "react";
import { onChangeCurrentCity } from "../../redux/features/citySlice";
import { ICurrentCityPropsModel } from "./models/currentCityPropsModel";
import { toast } from "react-toastify";
import Loader from "../../shared/components/loader";
import { IGeolocationModel } from "./models/geolocationModel";

const WeatherView = () => {
  const [temperatureValue, setTemperatureValue] = useState(0);
  const [temperatureUnit, setTemperatureUnit] = useState("");
  const dispatch = useAppDispatch();
  const { currentCity } = useAppSelector((state) => state.citySlice);
  const { unitMetric } = useAppSelector((state) => state.tempUnitSlice);
  const [mappedCurrentCity, setMappedCurrentCity] = useState<ICurrentCityPropsModel>();
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    // case 1: current city available in global state
    if (currentCity.key !== "") {
      getConditions();
    }
    // case 2: no current city available in global state
    else {
      // ask for user permission access current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          allowGeolocation(position)
        }, disagreeGeoLocation);
      }
    }
    // set loading to false 
    setLoading(false);
  }, [currentCity, unitMetric]);

  // user agree to get his current position 
  const allowGeolocation = async (position: IGeolocationModel) => {
    try {
      const { data } = await axios.get(
        `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${import.meta.env.VITE_APIKEY}&q=${position.coords.latitude},${position.coords.longitude}`
      );
      dispatch(
        onChangeCurrentCity({
          currentCity: {
            city: data.LocalizedName,
            country: data.Country.LocalizedName,
            key: data.Key,
          },
        })
      );
    } catch (err) {
      toast(String(err))
    }
  }
  // user disagree to get his current position 
  const disagreeGeoLocation = async () => {
    try {
      const { data } = await axios.get(`https://dataservice.accuweather.com/locations/v1/1662?apikey=${import.meta.env.VITE_APIKEY}`)
      dispatch(
        onChangeCurrentCity({
          currentCity: {
            city: data.ParentCity.LocalizedName,
            country: data.Country.LocalizedName,
            key: data.Key,
          },
        })
      );

    } catch (err) {
      toast(String(err))
    }
  }
  // get current conditions from key 
  const getConditions = async () => {
    try {
      const { data } = await axios.get(
        `https://dataservice.accuweather.com/currentconditions/v1/${currentCity.key}?apikey=${import.meta.env.VITE_APIKEY}`
      );
      // condition of unit metric from type Celsius or Fahrenheit
      setTemperatureValue(unitMetric? data[0].Temperature.Metric.Value: data[0].Temperature.Imperial.Value);
      setTemperatureUnit(unitMetric? data[0].Temperature.Metric.Unit: data[0].Temperature.Imperial.Unit);
      setMappedCurrentCity({
        city: currentCity.city,
        country: currentCity.country,
        key: currentCity.key,
        Imperial: data[0].Temperature.Imperial,
        Metric: data[0].Temperature.Metric,
        weatherIcon: data[0].WeatherIcon,
      });
    } catch (err) {
      toast(String(err))
    }

  };

  return (
    <>
      <Search />
      {mappedCurrentCity && !isLoading ? (
        <React.Fragment>
          <WeatherWidget currentCity={mappedCurrentCity} temperatureValue={temperatureValue} temperatureUnit={temperatureUnit} />
          <FullForecast />
        </React.Fragment>
      ) :
        <Loader />
      }
    </>
  );
};

export default WeatherView;
