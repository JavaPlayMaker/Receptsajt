import React from "react";
import { Link } from "react-router-dom";
import "./Category.css";

const Category = ({ recipes }) => {
  return (
    <div className="category-container">
      <h1>Category Page</h1>
      <ul className="category-list">
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <Link to={`/recipe/${recipe._id}`} className="recipe-link">
              <img src={recipe.imageUrl} alt={recipe.title} />
              <h3>{recipe.title}</h3>
              <p>⏱ {recipe.timeInMins} min | 💰 {recipe.price} SEK</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
