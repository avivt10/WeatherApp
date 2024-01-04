import { useCallback, useState } from "react";
import axios from "axios";
import { ISearchModel } from "./models/search.model";
import AutoCompleteValues from "./autoCompleteValues/autoCompleteValues";
import style from "./search.module.css";
import debounce from "lodash.debounce";
import { mappedSearchModel } from "./models/mappedSearchModel";
import { toast } from "react-toastify";

const Search = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<ISearchModel[]>([]);
  const DEBOUNCE_TIME = 300;
  const fetch = async (value: string): Promise<void> => {
    try {
      if (value) {
        const { data } = await axios.get(
          `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${import.meta.env.VITE_APIKEY}&q=${value}`
        );
        const mappedSearch: ISearchModel[] = data.map((el: mappedSearchModel) => ({
          key: el.Key,
          city: el.LocalizedName,
          country: el.Country.LocalizedName,
        }));

        setResults(mappedSearch);
      } else {
        setResults([]);
        setInput("");
      }
    } catch (err) {
      toast(String(err))
    }
  };

  // Debounce the API call
  const debouncedFetch = useCallback(debounce(fetch, DEBOUNCE_TIME), []);

  const handleInput = (value: string): void => {
    setInput(value);
    debouncedFetch(value);
  };

  return (
    <div className={style.searchWrapper}>
      <form className="p-2">
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
      {
        results.length > 0 &&
        <AutoCompleteValues
          results={results}
          setInput={setInput}
          setResults={setResults}
        />
      }
    </div>
  );
};

export default Search;
