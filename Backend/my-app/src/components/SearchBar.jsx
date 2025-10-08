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
    placeholder="Search"
    value={searchQuery}
    onChange={(e) => setSearchQuery (e.target.value)}
    onKeyDown={handleKeyDown}
    
    style={{
        padding: "10px",
        marginBottom: "20px",
        maxWidth: "500px",
        fontSize: "20px",
        border: "2px solid red"
       }}
    />
  );
}

export default SearchBar;