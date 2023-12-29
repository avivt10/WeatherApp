import { useState } from "react";

const Search = () => {
    const [input,setInput] = useState("");

    return (
        <form className="mb-5 m-auto"> 
            <input 
             placeholder="search..."
             value={input}
             className="border-0 bg-dark-subtle"
             />
        </form>
    );
};

export default Search;