import React from 'react';
import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe }) {
	if (!recipe) return null;
	return (
		<article className="recipe-card"> 
			<Link to={`/recipe/${recipe._id}`} className="recipe-link">
				<h3>{recipe.title}</h3>
				{recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} />}
				<p>{recipe.description}</p>
			</Link>
		</article>
	);
}

