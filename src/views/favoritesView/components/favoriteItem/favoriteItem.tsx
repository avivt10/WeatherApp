import SunnIcon3D from "../../../../assets/icons/3D/sunnIcon3D";
import StarIcon from "../../../../assets/icons/starIcon";
import { favoritePropsModel } from "../../../../redux/models/favorite.model";
import style from "./favoriteItem.module.css"

interface FavoritesItemProps{
    favorite:favoritePropsModel;
    setFavorite:() => void,
}

const FavoriteItem = ({favorite,setFavoritesArray} : FavoritesItemProps) => {
    return (
        <div>
         <StarIcon styleClass={style.starIconStyle}/>
        <p className={style.cityNameStyle}>{favorite.Name}</p>
        <SunnIcon3D width={100} height={100}/>
        <p className={style.temperatureStyle}>{favorite.temperatureValue}°{favorite.temperatureUnit}</p>
    </div>
    );
        };

export default FavoriteItem;
