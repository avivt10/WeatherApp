import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { ISearchModel } from "./models/search.model";
import AutoCompleteValues from "./autoCompleteValues/autoCompleteValues";
import style from "./search.module.css";
import debounce from "lodash.debounce";

const Search = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<ISearchModel[]>([]);

  const fetch = async (value: string): Promise<void> => {
    try {
      if (value) {
        const { data } = await axios.get(
          `http://localhost:3000/locations/v1/cities/autocomplete?q=${value}&apikey=${import.meta.env.VITE_APIKEY}`
        );
        console.log(data)
        setResults(data);
      } else {
        setResults([]);
        setInput("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Debounce the API call
  const debouncedFetch = useCallback(debounce(fetch, 2000), []);

  const handleInput = (value: string): void => {
    setInput(value);
    debouncedFetch(value);
  };

  return (
    <div className={style.searchWrapper}>
      <form className={style.inputForm}>
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
      {results.length && (
        <AutoCompleteValues
          key={results.key}
          results={results}
          setInput={setInput}
          setResults={setResults}
        />
      )}
    </div>
  );
};

export default Search;
