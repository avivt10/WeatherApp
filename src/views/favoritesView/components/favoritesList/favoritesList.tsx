import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../redux/hooks";
import FavoriteItem from "../favoriteItem";
import Loader from "../../../../shared/components/loader";

const FavoritesList = () => {
  const [isLoading, setIsLoading] = useState(true)
  const favoritesArray = useAppSelector(
    (state) => state.favoriteSlice.favorites
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000);
    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      {
        !isLoading ? 
      <div className="container">
        <div className="row gap-2">
          {favoritesArray.map((favorite) => (
            <div key={favorite.key} className="col-md-3 mb-4">
              <FavoriteItem favorite={favorite} />
            </div>
          ))}
        </div>
      </div> : 
      <Loader/>
      }
    </div>
  );
};

export default FavoritesList;
