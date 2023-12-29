import { useState } from "react";
import style from "./search.module.css";
import axios from "axios";
import { ISearchModel } from "../../../models/search.model";
import SearchIcon from "../../../../assets/icons/search";

const Search = () => {
    const [input, setInput] = useState("");

    const fetch = async (value: string) => {
        try {
            const res = await axios(`https://jsonplaceholder.typicode.com/todos/`)
            console.log(res)
            const result = res.data.filter((todo: ISearchModel) => {
                return value && todo && todo.title && todo.title.toLocaleLowerCase().includes(value);
            })
            console.log(result)
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleInput = (value: string) => {
        setInput(value);
        fetch(value);
    }
    return (
        <form className={style.search}>
            <SearchIcon styleClass="ms-2"/>
            <input
                placeholder="search by city..."
                value={input}
                onChange={(e) => handleInput(e.target.value)}
                className={style.input}
            />
        </form>
    );
};

export default Search;