import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import "./Home.css";
import Description from "../components/HomeDesription";
import { Link } from "react-router-dom";
import RecipeDifficulty from "../components/RecipeDifficulty";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Favorite recipes
  const pinnedIds = [
    "68ed014d8a8cd70776d9082a", // Id of Regnbågsrulle from the API
    "68ed029a8a8cd70776d90e3c", // Id of California-rullen from the API
    "68ecffac8a8cd70776d8fe86", // Id of Vegetarisk rullen from the API
  ];

  useEffect(() => {
    fetch("https://grupp2-vtsor.reky.se/recipes")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setRecipes(data);
        setFilteredRecipes(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const results = recipes.filter((r) =>
      r.title.toLowerCase().includes(query)
    );
    setFilteredRecipes(results);
  };

  if (loading) return <p> Recept laddar...</p>;
  if (error) return <p>Error: {error}</p>;

  // The division of the favories and the rest of the recipes
  const pinnedRecipes = filteredRecipes.filter((r) =>
    pinnedIds.includes(r._id)
  );
  const otherRecipes = filteredRecipes.filter(
    (r) => !pinnedIds.includes(r._id)
  );

return (
  <div className="home-container">
    <div className="description">
      <Description />
    </div>

    <div className="search-bar">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />
    </div>

    {/* Favorite recipes */}
    {pinnedRecipes.length > 0 && (
      <div className="favorites-section">
        <h2>Våra favoritrecept:</h2>
        <ul className="favorites-list">
          {pinnedRecipes.map((r) => (
            <li key={r._id}>
              <Link to={`/recipe/${r._id}`} className="recipe-link">
                <h3>{r.title}</h3>
                {r.imageUrl && <img src={r.imageUrl} alt={r.title} />}
                <p>{r.description}</p>
                <RecipeDifficulty timeInMins={r.timeInMins} />
                <p>
                  ⏱ {r.timeInMins} min | 💰 {r.price} SEK
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <hr className="divider" />
      </div>
    )}

    {/* The rest of the recipes */}
    {otherRecipes.length > 0 ? (
      <>
        <div className="other-section">
          <h2>Resterande av våra recept:</h2>
          <ul className="other-list">
            {otherRecipes.map((r) => (
              <li key={r._id}>
                <Link to={`/recipe/${r._id}`} className="recipe-link">
                  <h3>{r.title}</h3>
                  {r.imageUrl && <img src={r.imageUrl} alt={r.title} />}
                  <p>{r.description}</p>
                  <RecipeDifficulty timeInMins={r.timeInMins} />
                  <p>
                    ⏱ {r.timeInMins} min | 💰 {r.price} SEK
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Map section */}
        <h2 className="map-title">Vår plats i Stockholm</h2>
        <div className="map-container">
          <iframe
            title="Stockholm Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2243.427379330166!2d18.06324047604854!3d59.33459198193898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d2f3c05c3d1%3A0x400af0f661eb040!2sStockholm%2C%20Sweden!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </>
    ) : (
      <p>Inga fler recept hittades.</p>
    )}
  </div>
);
};

export default Home;
