import SunnIcon3D from "../../../../assets/icons/3D/sunnIcon3D";
import { favoritePropsModel } from "../../../../redux/models/favorite.model";

interface FavoritesItemProps{
    favorite:favoritePropsModel;
    setFavorite:() => void,
}

const FavoriteItem = ({favorite,setFavoritesArray} : FavoritesItemProps) => {
    return (
        <div>
            <p>{favorite.cityName}</p>
            <p className="">{favorite.countryName}</p>
            <SunnIcon3D width={80} height={80}/>
        </div>
    );
};

export default FavoriteItem;