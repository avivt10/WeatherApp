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
  // on init get Tel Aviv
  useEffect(() => {
    if (currentCity) {
      const getCityDetails = async () => {
        try{
          const { data } = await axios.get(
            `http://dataservice.accuweather.com/locations/v1/1662?apikey=${import.meta.env.VITE_APIKEY}`
          );
          dispatch(
            onChangeCurrentCity({
              currentCity: {
                city: data.ParentCity.LocalizedName,
                country: data.Country.LocalizedName,
                key: data.ParentCity.Key,
              },
            })
          );
        }catch(err){   
          toast(String(err))
        }
    }
    getCityDetails();
  }}
  , []);

  useEffect(() => {
    if (currentCity.key) getConditions();
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
