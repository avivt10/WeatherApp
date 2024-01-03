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
  const [mappedCurrentCity, setMappedCurrentCity] = useState<ICurrentCityPropsModel>();
  const [isLoading, setLoading] = useState(true)

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
      const { data } = await axios.get(`http://dataservice.accuweather.com/locations/v1/${key}?apikey=${import.meta.env.VITE_APIKEY}`)
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
      const { data } = await axios.get(`http://dataservice.accuweather.com/locations/v1/${key}?apikey=${import.meta.env.VITE_APIKEY}`)
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
        `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${import.meta.env.VITE_APIKEY}&q=${latitude},${longitude}`
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
  }, [currentCity]);


  const getConditions = async () => {
    try {
      const { data } = await axios.get(
        `http://dataservice.accuweather.com/currentconditions/v1/${currentCity.key}?apikey=${import.meta.env.VITE_APIKEY}`
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
          {/* <li classNameName="buttonSwitchTemperature">
            <label classNameName="switch">
                <span classNameName={` ${isFahrenheitTemperature ? 'active' : ''}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg></span>
                <span classNameName={` ${isFahrenheitTemperature ? 'active' : ''}`}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg></span>   
                <input type="checkbox" classNameName="input" onChange={handleSwitchChangeTypeTemperature}/>
                <span classNameName="slider"></span>
            </label>
        </li> */}
          <WeatherWidget currentCity={mappedCurrentCity} />
          <FullForecast />
        </React.Fragment>
      ) :
        <Loader />
      }
    </>
  );
};

export default WeatherView;
