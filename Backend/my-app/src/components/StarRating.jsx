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

 // if (submitted) return <p>Tack för ditt betyg!</p>;

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={!submitted ? () => handleClick(star) : undefined}
          style={{
            cursor: submitted ? "default" : "pointer",
            fontSize: "2rem",
            color: star <= rating ? "gold" : "#ccc",
            transition: "color 0.3s",
            marginRight: "4px",
          }}
        >
          ★
        </span>
      ))}

      {submitted && (
        <p style={{ marginTop: "0.5rem", color: "white", fontSize: "1.5rem" }}>
          Tack för ditt betyg! ({rating} stjärnor)
        </p>
      )}
    </div>
  );
}
