import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RatingStars from "../components/StarRating";
import ToDoList from "../components/ToDoList";
import { getRecipe } from "../services/api";
import "./Recipe.css";
import RecipeDifficulty from "../components/RecipeDifficulty";
import CommentsSection from "../components/CommentsSection";
import AmountOfPortion from "../components/AmountOfPortion";

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [currentPortions, setCurrentPortions] = useState(1);

  useEffect(() => {
    getRecipe(id)
      .then((data) => {
        setRecipe(data);
        setCurrentPortions(data.portions || 1);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);


  const scaleIngredientAmount = (amount) => {
    if (!recipe || !recipe.portions) return amount;
    const factor = currentPortions / recipe.portions;
    return (amount * factor).toFixed(2).replace(/\.00$/, "");
  };

  if (loading) return <p>Recept laddar...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!recipe) return <p>Inget recept hittades.</p>;

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

       {/* Ingredients and to-do list */}
<div className="recipe-details">
  <div className="ingredients-card">
    <h2>Ingredienser:</h2>
    <AmountOfPortion
      recipe={recipe}
      currentPortions={currentPortions}
      setCurrentPortions={setCurrentPortions}
    />
    <ul>
      {recipe?.ingredients?.map((ing, i) => (
        <li key={i}>
          {scaleIngredientAmount(ing.amount)} {ing.unit} {ing.name}
        </li>
      )) || <li>Inga ingredienser tillgängliga.</li>}
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
