import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import FullForecast from "./components/fullForecast";
import Search from "./components/search";
import WeatherWidget from "./components/weatherWidget";
import React, { useEffect, useState } from "react";
import { onChangeCurrentCity } from "../../redux/features/citySlice";
import { ICurrentCityPropsModel } from "./models/currentCityPropsModel";
import { toast } from "react-toastify";

const WeatherView = () => {
  const dispatch = useAppDispatch();
  const { currentCity } = useAppSelector((state) => state.citySlice);
  const [mappedCurrentCity, setMappedCurrentCity] =
    useState<ICurrentCityPropsModel>();
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

  // on init get Tel Aviv
  useEffect(() => {
    if(currentCity.key === ""){
      const getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
              setLatitude(position.coords.latitude);
              setLongitude(position.coords.longitude);
              getCityDetailsByLocation(position.coords.latitude, position.coords.longitude);
            },
            () => {
              getCityByDefault("1662");
            }
          );
        } 
      };
      getLocation();
    }else{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
          () => {
            getCityDetailsByLocationKey(currentCity.key);
          }
        )
      }
    }
  }, []);


const getCityByDefault = async(key: string) => {
  try{
    const {data} = await axios.get(`http://dataservice.accuweather.com/locations/v1/${key}?apikey=${import.meta.env.VITE_APIKEY}`)
    dispatch(
      onChangeCurrentCity({
        currentCity: {
          city: data.ParentCity.LocalizedName,
          country: data.Country.LocalizedName,
          key: data.Key,
        },
      })
    );

  }catch(err){
    toast(String(err))
  }
}


  const getCityDetailsByLocationKey = async(key: string) => {
    try{
      const {data} = await axios.get(`http://dataservice.accuweather.com/locations/v1/${key}?apikey=${import.meta.env.VITE_APIKEY}`)
      dispatch(
        onChangeCurrentCity({
          currentCity: {
            city: data.LocalizedName,
            country: data.Country.LocalizedName,
            key: data.Key,
          },
        })
      );

    }catch(err){
      toast(String(err))
    }
  }




  const getCityDetailsByLocation = async (latitude:number, longitude:number) => {
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
    try{
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
    }catch(err){
      toast(String(err))
    }

  };

  return (
    <>
      <Search />
      {mappedCurrentCity ? (
        <React.Fragment>
          <WeatherWidget currentCity={mappedCurrentCity} />
          <FullForecast />
        </React.Fragment>
      ) : (
        <div> loading ...</div>
      )}
    </>
  );
};

export default WeatherView;
