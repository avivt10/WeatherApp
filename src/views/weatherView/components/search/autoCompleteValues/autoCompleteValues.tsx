import style from "./autoCompleteValues.module.css";
import StarIcon from "../../../../../assets/icons/starIcon";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  onAddFavorite,
  onDeleteFavorite,
} from "../../../../../redux/features/favoriteSlice";
import { favoritePropsModel } from "../../../../../redux/models/favorite.model";
import { ISearchModel } from "../models/search.model";
import { onChangeCurrentCity } from "../../../../../redux/features/citySlice";
import { autoCompleteValuesModel } from "./models/autoCompleteValuesModel";

const AutoCompleteValues = ({
  results,
  setInput,
  setResults,
}: autoCompleteValuesModel) => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.favoriteSlice);

  const navigateToCity = (city: ISearchModel) => {
    dispatch(onChangeCurrentCity({ currentCity: city }));
    setInput("");
    setResults([]);
  };

  const toggleFavorite = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    city: ISearchModel
  ) => {
    event.stopPropagation();
    if (favorites.some((favorite) => favorite.key === city.key)) {
      // remove from state
      dispatch(onDeleteFavorite({ Key: city.key }));
    } else {
      addNewCity(city);
    }
  };

  const addNewCity = (city: ISearchModel) => {
    const newFavorite: favoritePropsModel = {
      key: city.key,
      cityName: city.city || "",
      countryName: city.country || "",
    };
    dispatch(onAddFavorite(newFavorite));
  };

  return (
    <div className={`${style.results} mt-2`}>
      {results?.length > 0 && (
        <div className="mb-2">
          <ul className="list-group list-group-flush">
            {results.map((result) => (
              <li
                key={result.key}
                className={`${style.listItem} list-group-item d-flex justify-content-between`}
                onClick={() => navigateToCity(result)}
              >
                <span className="text-white">
                  {result.city}, {result.country}
                </span>
                <div onClick={(e) => toggleFavorite(e, result)}>
                  <StarIcon
                    width={20}
                    height={20}
                    color={
                      favorites.some((favorite) => favorite.key === result.key)
                        ? "#ffdd00"
                        : "#828a93"
                    }
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AutoCompleteValues;
