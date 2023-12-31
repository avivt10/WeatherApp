import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import FullForecast from "./components/fullForecast";
import Search from "./components/search";
import WeatherWidget from "./components/weatherWidget";
import React, { useEffect, useState } from "react";
import { ISearchModel } from "./components/search/models/search.model";
import { onChangeCurrentCity } from "../../redux/features/citySlice";

interface IMetricModel {
  value: number;
  Unit: string;
  UnitType: number;
}

interface IImperialModel extends IMetricModel { }

export interface ICurrentCityModel {
  currentCity: ICurrentCityPropsModel
}

export interface ICurrentCityPropsModel extends ISearchModel {
  weatherText?: string;
  Metric?: IMetricModel;
  Imperial?: IImperialModel
}

const WeatherView = () => {
  const dispatch = useAppDispatch()
  const { currentCity } = useAppSelector((state) => state.citySlice);
  const [mappedCurrentCity, setMappedCurrentCity] = useState<ICurrentCityPropsModel>()

  // on init get tel aviv
  useEffect(() => {
    const getCityDetails = async () => {
      const { data } = await axios.get(`http://localhost:3000/locations/v1/cities/geoposition/search?apikey=${import.meta.env.VITE_APIKEY}=32.060266,34.760680`)
      dispatch(onChangeCurrentCity({
        currentCity: {
          city: data.ParentCity.LocalizedName,
          country: data.Country.LocalizedName,
          key: data.ParentCity.Key
        }
      }))
    }
    getCityDetails();
  }, [])

  useEffect(() => {
    if (currentCity.key)
      getConditions();
  }, [currentCity])

  const getConditions = async () => {
    const { data } = await axios.get(`http://localhost:3000/currentconditions/v1/${currentCity.key}?apikey=${import.meta.env.VITE_APIKEY}`)
    console.log(data)
    setMappedCurrentCity({
      city: currentCity.city,
      country: currentCity.country,
      key: currentCity.key,
      Imperial: data[0].Temperature.Imperial,
      Metric: data[0].Temperature.Metric,
      weatherText: data[0].WeatherText
    })
  }

  return (
    <>
      <Search />
      {mappedCurrentCity ?
        <React.Fragment>
          <WeatherWidget currentCity={mappedCurrentCity} />
          <FullForecast currentCity={mappedCurrentCity} />
        </React.Fragment>
        : <div>loader..</div>}

    </>
  );
};

export default WeatherView;
