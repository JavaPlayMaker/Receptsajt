import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RatingStars from "../components/StarRating";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import IngredientsList from "../components/IngredientsList";
import ToDoList from "../components/TodoList";
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
<div className="ingredients">
          <h2>Ingredienser:</h2>
          <ul>
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>
                {ing.amount} {ing.unit} {ing.name}
              </li>
            ))}
          </ul>
          </div>
         <ToDoList instructions={recipe.instructions} />
          <RatingStars recipeId={recipe._id} />
          <CommentForm recipeId={recipe._id} />
          <CommentList recipeId={recipe._id} />
        </div>
      ) : (
        <p>Inget recept hittades.</p>
      )}
    </div>
  );
};

export default Recipe;