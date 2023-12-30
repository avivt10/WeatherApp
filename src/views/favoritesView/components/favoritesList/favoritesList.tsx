import { useState } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import FavoriteItem from "../favoriteItem";
import style from "./favoritesList.module.css"

const FavoritesList = () => {
    const [favoritesArray,setFavoritesArray] = useState(useAppSelector(state => state.favoriteSlice.favorites))
    return (
        <div>
        <div className="container">
          <div className="row gap-5">
            {favoritesArray.map((favorite) => (
              <div key={favorite.key} className={`${style.favoritesListContainer} col-md-3 mb-4`}>
                <FavoriteItem
                  favorite={favorite}
                  setFavoritesArray={setFavoritesArray}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default FavoritesList;