import React, { useEffect, useState } from "react";

export default function AmountOfPortion({ recipe}) {
    const [portion, setPortion] = useState(1);

    if (!recipe) return <p>Laddar recept...</p>;

return (
    <div>
        <label className="portion-label">
            Antal portioner:{" "}
            <input
                type="number"
                min="1"
            value={portion}
          onChange={(e) => setPortion(e.target.value)}
          className="portion-input"
        />        
    </label>

<ul className="ingredients-list">
    {recipe.ingredients.map((ing) => (
        <li key={ing._id}>
{Number(ing.amount * portion).toLocaleString(undefined, { maximumFractionDigits: 2 })} {ing.unit} {ing.name}
        </li>
    ))}
</ul>

    </div>
);
}