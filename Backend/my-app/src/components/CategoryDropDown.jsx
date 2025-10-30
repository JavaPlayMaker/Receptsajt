import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getRecipesByCategory } from "../services/api";
import "../pages/Category.css"

import RecipeDifficulty from "./RecipeDifficulty";


export default function CategoryDropDown() {
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
    <div className="category-container">
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      {recipes.length > 0 ? (
        <ul className="category-list">
           {recipes.map((recipe) => (
          <li key={recipe._id}>
            <Link to={`/recipe/${recipe._id}`} className="recipe-link">
              <h3>{recipe.title}</h3>
              <img src={recipe.imageUrl} alt={recipe.title} />
              <p>{recipe.description}</p>
                <RecipeDifficulty timeInMins={recipe.timeInMins} />
              <p>
                ⏱ {recipe.timeInMins} min | 💰 {recipe.price} SEK
              </p>
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
