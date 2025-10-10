import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RatingStars from "../components/StarRating";
import { getRecipe } from "../services/api";

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
  }, []);

  if (loading) return <p> Loading recipes.</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {recipe ? (
        <>
          <h1>{recipe.title}</h1>
          {recipe.imageUrl && (
            <img src={recipe.imageUrl} alt={recipe.title} width="150" />
          )}
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
          <RatingStars recipeId={recipe._id} />
        </>
      ) : (
        <p>No recipe found.</p>
      )}
    </div>
  );
};

export default Recipe;
