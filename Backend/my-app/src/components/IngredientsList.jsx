import React, {use, useEffect, useState} from "react";


const IngredientsList = () => {
const [ingredientsList, setIngredientsList] = useState([]);


useEffect(() => {
const fetchIngredientList = async () => {
try {
const response = await fetch ('https://grupp2-vtsor.reky.se/recipes');
const data = await response.json();

const allIngredients = data.flatMap((recipe) =>
recipe.ingredients.map((ingredient) => ingredient.name)
);

const uniqueIngredients = [...new Set(allIngredients)];
setIngredientsList(uniqueIngredients);

} catch (error) {
console.error("Error fetching ingredients:", error);

}
};

fetchIngredients();

}, []);

return (
<div>
<h2>Ingredients List</h2>
<ul>
{ingredients.map((item, index) => (
<li key={index}>{item}</li>
))}
</ul>
</div>
);
};

export default IngredientsList;
