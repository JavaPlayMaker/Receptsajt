import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
<<<<<<< HEAD
import { Link } from "react-router";
=======
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

>>>>>>> d81c41e818af513cb17a39f0265e4a852cd1b3f8

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

if (loading) return <p> Loading recipes.</p>;
if (error) return <p>Error: {error}</p>;

return (
<div>
<h1>Recipes</h1>

<SearchBar
searchQuery={searchQuery}
setSearchQuery={setSearchQuery}
onSearch={handleSearch}
/>

{filteredRecipes.length > 0 ? (
<ul>
{filteredRecipes.map((r) => (
<li key={r._id}>
<Link to={`/recipe/${r._id}`}>
<h2>{r.title}</h2>
{r.imageUrl && <img src={r.imageUrl} alt={r.title} width="150" />}
<p>{r.description}</p>
<p>
Time: {r.timeInMins} mins | Price: {r.price} SEK
</p>
</Link>
<ul>
{r.ingredients.map((ing, i) => (
<li key={i}>
{ing.amount} {ing.unit} {ing.name}
</li>
))}
</ul>
</li>
))}
</ul>
) : (
<p>No recipes found.</p>
)}
</div>
);
};
export default Home;