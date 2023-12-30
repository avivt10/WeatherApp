import { useState } from "react";
import style from "./search.module.css";
import axios from "axios";
import { ISearchModel } from "../../../models/search.model";
import SearchIcon from "../../../../assets/icons/searchIcon";
import StarIcon from "../../../../assets/icons/starIcon";

const Search = () => {
    const [input, setInput] = useState("");
    const [results, setResults] = useState<ISearchModel[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    
    const fetch = async (value: string) => {
        try {
            const res = await axios(`https://jsonplaceholder.typicode.com/todos/`)
            const result = res.data.filter((todo: ISearchModel) => {
                return value && todo && todo.title && todo.title.toLocaleLowerCase().startsWith(value.toLocaleLowerCase());
            })
            setResults(result);
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleInput = (value: string) => {
        setInput(value);
        fetch(value);
    }

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
        <div className="container mt-3">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form className={style.search}>
                        <div className="input-group">
                            <span className="input-group-text">
                                <SearchIcon styleClass="ms-2" />
                            </span>
                            <input
                                type="text"
                                placeholder="Search by city..."
                                value={input}
                                onChange={(e) => handleInput(e.target.value)}
                                className="form-control"
                            />
                        </div>
                    </form>
                    <div className={`${style.results} mt-2`} style={{ maxHeight: "300px", overflowY: "auto" }}>
                        {results.length > 0 && (
                            <div className="mb-2">
                                <ul className="list-group list-group-flush">
                                    {results.map((result) => (
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
                </div>
            </div>
        </div>
    );
};

export default Search;