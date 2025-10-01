import React, { useState, useEffect } from "react";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://grupp2-vtsor.reky.se/recipes")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setRecipes(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

if (loading) return <p> Loading recipes.</p>
if (error) return <p>Error: {error}</p>

return (
    <div>
        <h1>Recipes</h1>
{recipes.length > 0 ? (
            <ul>
                {recipes.map((r) => (
                    <li key={r.id}>
                        <h2>{r.title}</h2>
                        {r.imageUrl && <img src={r.imageUrl} alt={r.title} width="150" />}
                        <p>{r.description}</p>
                        <p>
                            Time: {r.timeInMins} mins |  Price: {r.price} SEK
                        </p> 
                        <ul>
    {r.ingredients.map((ing, i ) => (
        <li key={i}>
{ing.amount} {ing.unit} {ing.name}
    </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    ) : (
      <p>No recipes found.</p>
    )}
  </div>
);

}
 export default App;


 