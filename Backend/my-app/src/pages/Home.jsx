import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";

import "./Home.css";
import Description from "../components/HomeDesription";
import { Link } from "react-router-dom"; 


const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    fetch("https://grupp2-vtsor.reky.se/recipes")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {setRecipes(data); setFilteredRecipes(data);})
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = () => {
  const query = searchQuery.toLowerCase();
  const results = recipes.filter((r) => r.title.toLowerCase().includes(query));
  setFilteredRecipes(results);
};

  if (loading) return <p> Recept laddar.</p>;
  if (error) return <p>Error: {error}</p>;

  return (
 <div className="home-container">
  <div className="description">
  <Description/>
  </div>
  <h1>Recipes</h1>
  <div className="search-bar">
    <SearchBar 
      searchQuery={searchQuery} 
      setSearchQuery={setSearchQuery} 
      onSearch={handleSearch} 
    />
  </div>

  {filteredRecipes.length > 0 ? (
    <ul className="recipe-list">
      {filteredRecipes.map((r) => (
        <li key={r.id} className="recipe-item">
           <Link to={`/recipe/${r._id}`}className="recipe-link">
          <h2>{r.title}</h2>
          {r.imageUrl && <img src={r.imageUrl} alt={r.title} />}
          <p>{r.description}</p>
          <p>⏱ {r.timeInMins} min | 💰 {r.price} SEK</p>
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <p>Inget recept hittades.</p>
  )}
</div>
      );
};
export default Home;
