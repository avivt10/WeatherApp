import { useAppSelector } from "../../../../redux/hooks";
import FavoriteItem from "../favoriteItem";

const FavoritesList = () => {
  const favoritesArray = useAppSelector(
    (state) => state.favoriteSlice.favorites
  );
  return (
    <div>
      <div className="container">
        <div className="row gap-2">
          {favoritesArray.map((favorite) => (
            <div key={favorite.key} className="col-md-3 mb-4">
              <FavoriteItem favorite={favorite} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesList;
