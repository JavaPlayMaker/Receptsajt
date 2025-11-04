import { useState } from "react";
import { postRating } from "../services/api";

export default function RatingStars({ recipeId }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async (value) => {
    try {
      setRating(value);
      await postRating(recipeId, value);
      setSubmitted(true);
    } catch {
      setError("Fel vid inskickning av betyg. Försök igen.");
    }
  };

  return (
    <div className="recipe-rating">
      {error && <p className="rating-error">{error}</p>}
      <div className="star-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${
              star <= (hover || rating) ? "filled" : ""
            } ${hover && star <= hover ? "hovered" : ""}`}
            onClick={!submitted ? () => handleClick(star) : undefined}
            onMouseEnter={() => !submitted && setHover(star)}
            onMouseLeave={() => !submitted && setHover(null)}
          >
            ★
          </span>
        ))}
      </div>
      {submitted && (
        <p className="rating-thanks">
          Tack för ditt betyg! ({rating} stjärnor)
        </p>
      )}
    </div>
  );
}
