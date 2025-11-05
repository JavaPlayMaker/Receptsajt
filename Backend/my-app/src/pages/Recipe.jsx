import React, { useState } from "react";
import { useParams } from "react-router-dom";
import RatingStars from "../components/StarRating";
import ToDoList from "../components/ToDoList";
import useRecipe from "../components/useRecipe";
import "./Recipe.css";
import RecipeDifficulty from "../components/RecipeDifficulty";
import CommentsSection from "../components/CommentsSection";
import AmountOfPortion from "../components/AmountOfPortion";

const Recipe = () => {
  const { id } = useParams();
  const { recipe, loading, error } = useRecipe(id);

  const [currentPortions, setCurrentPortions] = useState(1);

  if (loading) return <p>Laddar recept...</p>;
  if (error) return <p>Ett fel uppstod: {error.message}</p>;
  if (!recipe) return <p>Inget recept hittades.</p>;

  return (
    <div className="recipe-container">
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

        {/* 🟢 EN instans av ingredienser och instruktioner */}
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

        <CommentsSection recipeId={recipe._id} />
      </div>
    </div>
  );
};

export default Recipe;