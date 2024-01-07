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

const WeatherView = () => {
  const dispatch = useAppDispatch();
  const { currentCity } = useAppSelector((state) => state.citySlice);
  const { unitMetric } = useAppSelector((state) => state.tempUnitSlice);
  const [mappedCurrentCity, setMappedCurrentCity] = useState<ICurrentCityPropsModel>();
  const [isLoading, setLoading] = useState(true)
  const [temperatureValue, setTemperatureValue] = useState(0);
  const [temperatureUnit, setTemperatureUnit] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentCity.key === "") {
        const getLocation = () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              getCityDetailsByLocation(position.coords.latitude, position.coords.longitude);
            },
              () => {
                getCityByDefault("1662");
              }
            );
          }
        };
        getLocation();
      } else {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            () => {
              getCityDetailsByLocationKey(currentCity.key);
            }
          )
        }
      }
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // on init get Tel Aviv
  const getCityByDefault = async (key: string) => {
    try {
      const { data } = await axios.get(`https://dataservice.accuweather.com/locations/v1/${key}?apikey=${import.meta.env.VITE_APIKEY}`)
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

  const getCityDetailsByLocationKey = async (key: string) => {
    try {
      const { data } = await axios.get(`https://dataservice.accuweather.com/locations/v1/${key}?apikey=${import.meta.env.VITE_APIKEY}`)
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


  const getCityDetailsByLocation = async (latitude: number, longitude: number) => {
    try {
      const { data } = await axios.get(
        `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${import.meta.env.VITE_APIKEY}&q=${latitude},${longitude}`
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


  useEffect(() => {
    if (currentCity.key) {
      getConditions();
    }
  }, [currentCity, unitMetric]);


  const getConditions = async () => {
    try {
      const { data } = await axios.get(
        `https://dataservice.accuweather.com/currentconditions/v1/${currentCity.key}?apikey=${import.meta.env.VITE_APIKEY}`
      );
      setTemperatureValue(
        unitMetric
          ? data[0].Temperature.Metric.Value
          : data[0].Temperature.Imperial.Value
      );
      setTemperatureUnit(
        unitMetric
          ? data[0].Temperature.Metric.Unit
          : data[0].Temperature.Imperial.Unit
      );
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
