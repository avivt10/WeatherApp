import { useState } from "react";
import axios from "axios";
import { ISearchModel } from "../../../models/search.model";
import AutoCompleteValues from "./autoCompleteValues/autoCompleteValues";
import style from "./search.module.css";

const Search = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<ISearchModel[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const fetch = async (value: string) => {
    try {
      const res = await axios(`https://jsonplaceholder.typicode.com/todos/`);
      const result = res.data.filter((todo: ISearchModel) => {
        return (
          value &&
          todo &&
          todo.title &&
          todo.title.toLocaleLowerCase().startsWith(value.toLocaleLowerCase())
        );
      });
      setResults(result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInput = (value: string) => {
    setInput(value);
    fetch(value);
  };

  return (
    <div className="row justify-content-center">
      <form>
        {/* input search */}
        <input
          type="text"
          placeholder="Search for cities"
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          className={style.inputBox}
        />
      </form>

      {/* display auto complete values */}
      <AutoCompleteValues
        results={results}
        favorites={favorites}
        setFavorites={setFavorites}
      />
    </div>
  );
};

export default Search;
