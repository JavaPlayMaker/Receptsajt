import React from "react";

function SearchBar ({ searchQuery, setSearchQuery, onSearch }) {

const handleKeyDown = (enter) => {
    if (enter.key === "Enter") {
        onSearch();
    }
};

return (
    <input
    type="text"
    placeholder="Sök"
    value={searchQuery}
    onChange={(e) => setSearchQuery (e.target.value)}
    onKeyDown={handleKeyDown}
    
    />
  );
}

export default SearchBar;