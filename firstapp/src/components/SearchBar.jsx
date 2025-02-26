import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <button onClick={handleSearch}>Search</button>
            <button onClick={() => { setQuery(""); onSearch(""); }}>Reset</button>
        </div>
    );
};

export default SearchBar;
