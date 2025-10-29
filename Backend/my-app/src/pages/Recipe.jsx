import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RatingStars from "../components/StarRating";
import ToDoList from "../components/ToDoList";
import { getRecipe } from "../services/api";
import "./Recipe.css";
import RecipeDifficulty from "../components/RecipeDifficulty";
import CommentsSection from "../components/CommentSection";

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

  if (loading) return <p>Recept laddar...</p>;
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

          {/* star rating on recipe */}
          <div className="recipe-rating">
            <RatingStars recipeId={recipe._id} />
          </div>

          {/* cooking difficulty */}
          <div className="recipe-difficulty">
            <RecipeDifficulty timeInMins={recipe.timeInMins} />
          </div>

          {/* recipe description */}
          <p className="recipe-description">{recipe.description}</p>

          {/* cookingtime and price */}
          <p className="recipe-meta">
            ⏱ {recipe.timeInMins} min | 💰 {recipe.price} SEK
          </p>

          {/* ingrediens and todo list */}
          <div className="recipe-details">
            <div className="ingredients-card">
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
          </div>

          {/* comment section */}
          <CommentsSection recipeId={recipe._id} />
        </div>
      ) : (
        <p>Inget recept hittades.</p>
      )}
    </div>
  );
};

export default Recipe;
