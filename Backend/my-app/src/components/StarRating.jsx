import { useState } from "react";
import { postRating } from "../services/api";

export default function RatingStars({ recipeId }) {
  const [rating, setRating] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async (value) => {
    try {
      setRating(value);
      await postRating(recipeId, value);
      setSubmitted(true);
    } catch  {
      setError("Fel vid inskickning av betyg. Försök igen.");
    }
  };

  if (submitted) return <p>Tack för ditt betyg!</p>;

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleClick(star)}
          style={{
            cursor: "pointer",
            fontSize: "1.5rem",
            color: star <= rating ? "gold" : "gray",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
