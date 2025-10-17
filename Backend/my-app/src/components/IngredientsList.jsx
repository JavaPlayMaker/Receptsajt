// src/components/IngredientsList.jsx
import React from "react";

export default function IngredientsList({ ingredients = [] }) {
  if (!ingredients || ingredients.length === 0) {
    return <p>Inga ingredienser tillgängliga.</p>;
  }

  return (
    <div className="ingredients-list">
      <h2>Ingredienser</h2>
      <ul>
        {ingredients.map((ing, i) => (
          <li key={i}>
            {ing.amount} {ing.unit} {ing.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

