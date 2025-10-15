import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
<<<<<<< HEAD

const Recipe = () => {
const { id } = useParams();
const [recipe, setRecipe] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
fetch(`https://grupp2-vtsor.reky.se/recipes/${id}`)
.then((res) => {
if (!res.ok) throw new Error("Network response was not ok");
return res.json();
})
.then((data) => setRecipe(data))
.catch((err) => setError(err.message))
.finally(() => setLoading(false));
}, []);

if (loading) return <p> Loading recipes.</p>;
if (error) return <p>Error: {error}</p>;

return (
<div>
{recipe ? (
<>
<h1>{recipe.title}</h1>
{recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} width="150" />}
<p>{recipe.description}</p>
<p>
Time: {recipe.timeInMins} mins | Price: {recipe.price} SEK
</p>
<ul>
{recipe.ingredients.map((ing, i) => (
<li key={i}>
{ing.amount} {ing.unit} {ing.name}
</li>
))}
</ul>
</>
) : (
<p>No recipe found.</p>
)}
</div>
);
=======
import RatingStars from "../components/StarRating";
import { getRecipe } from "../services/api";
import "./Recipe.css";

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getRecipe(id)
      .then((data) => setRecipe(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p> Recept laddar.</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="recipe-container">
      {recipe ? (
        <div className="recipe-card">
          <h1 className="recipe-title">{recipe.title}</h1>

          {recipe.imageUrl && (
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="recipe-image"
            />
          )}
          <p>{recipe.description}</p>
          <p className="recipe-meta">
            ⏱ {recipe.timeInMins} min | 💰 {recipe.price} SEK
          </p>

          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>
                {ing.amount} {ing.unit} {ing.name}
              </li>
            ))}
          </ul>
          <RatingStars recipeId={recipe._id} />

        </div>
      ) : (
        <p>Inget recept hittades.</p>
      )}
    </div>
  );
>>>>>>> d81c41e818af513cb17a39f0265e4a852cd1b3f8
};

export default Recipe;
