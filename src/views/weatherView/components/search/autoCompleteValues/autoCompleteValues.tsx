import { ISearchModel } from "../../../../models/search.model";
import style from "./autoCompleteValues.module.css"
import StarIcon from "../../../../../assets/icons/starIcon";

interface autoCompleteValuesModel {
    results: ISearchModel[],
    favorites: string[],
    setFavorites: React.Dispatch<React.SetStateAction<string[]>>,
}

const AutoCompleteValues = ({results, favorites, setFavorites} : autoCompleteValuesModel) => {
    const toggleFavorite = (id: string) => {
        if (favorites.includes(id)) {
            setFavorites(favorites.filter(favId => favId !== id));
        } else {
            if (favorites.length < 5) {
                setFavorites([...favorites, id]);
            } else {
                alert("You can mark up to 5 favorites.");
            }
        }
    };
    return (
        <div className={`${style.results} mt-2`}>
        {results?.length > 0 && (
            <div className="mb-2">
                <ul className="list-group list-group-flush">
                    {results.map((result)=> (
                        <li key={result.id} className="list-group-item d-flex justify-content-between">
                            {result.title}
                            <div onClick={() => toggleFavorite(result.id)}>
                                <StarIcon
                                    width={20}
                                    height={20}
                                    color={favorites.includes(result.id) ? "#ffdd00" : "gray"}
                                    styleClass=""
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