import React, { useState } from "react";
import { useParams } from "react-router-dom";
import RatingStars from "../components/StarRating";
import ToDoList from "../components/ToDoList";
import useRecipe from "../components/UseRecipe";
import "./Recipe.css";
import RecipeDifficulty from "../components/RecipeDifficulty";
import CommentsSection from "../components/CommentsSection";
import AmountOfPortion from "../components/AmountOfPortion";

const Recipe = () => {
  const { id } = useParams();
<<<<<<< HEAD
  const { recipe, loading, error } = useRecipe(id);
=======
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

>>>>>>> main
  const [currentPortions, setCurrentPortions] = useState(1);

  if (loading) return <p>Laddar recept...</p>;
  if (error) return <p>Ett fel uppstod: {error.message}</p>;

  return (
    <div className="recipe-container">
      {recipe ? (
        <div className="recipe-card">
          <h1 className="recipe-title">{recipe.title}</h1>
          {recipe.imageUrl && (
            <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
          )}

          <div className="recipe-rating">
            <RatingStars recipeId={recipe._id} />
          </div>

          <div className="recipe-difficulty">
            <RecipeDifficulty timeInMins={recipe.timeInMins} />
          </div>

          <p className="recipe-description">{recipe.description}</p>
          <p className="recipe-meta">⏱ {recipe.timeInMins} min | 💰 {recipe.price} SEK</p>

          <div className="recipe-details">
            <div className="ingredients-card">
              <h2>Ingredienser:</h2>
              <AmountOfPortion
                recipe={recipe}
                currentPortions={currentPortions}
                setCurrentPortions={setCurrentPortions}
              />
            </div>
            <ToDoList instructions={recipe.instructions} />
          </div>

<<<<<<< HEAD
=======
       {/* Ingredients and to-do list */}
<div className="recipe-details">
  <div className="ingredients-card">
    <h2>Ingredienser:</h2>
    <AmountOfPortion
      recipe={recipe}
      currentPortions={currentPortions}
      setCurrentPortions={setCurrentPortions}
    />

     </div>

            <ToDoList instructions={recipe.instructions} />
          </div>

        {/* comment section */}
>>>>>>> main
          <CommentsSection recipeId={recipe._id} />
        </div>
      ) : (
        <p>Inget recept hittades.</p>
      )}
    </div>
  );
};

export default Recipe;
