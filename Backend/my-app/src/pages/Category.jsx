import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRecipesByCategory } from "../services/api";
import "./Home.css";

export default function Category() {
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getRecipesByCategory(category)
      .then((data) => {
        setRecipes(Array.isArray(data) ? data : []);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) return <p>Laddar recept...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="category-page">
      <h1>Kategori: {category}</h1>
      {recipes.length > 0 ? (
        <ul className="recipe-list">
          {recipes.map((r) => (
            <li key={r._id} className="recipe-item">
              <Link to={`/recipe/${r._id}`} className="recipe-link">
                <h2>{r.title}</h2>
                {r.imageUrl && <img src={r.imageUrl} alt={r.title} />}
                <p>{r.description}</p>
                <p>⏱ {r.timeInMins} min | 💰 {r.price} SEK</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Inga recept i denna kategori.</p>
      )}
    </div>
  );
}
