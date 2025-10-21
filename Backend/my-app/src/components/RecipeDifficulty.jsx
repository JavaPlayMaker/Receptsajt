import React from "react";

const RecipeDifficulty = ({ timeInMins }) => {
  let difficulty;

  if (timeInMins <= 20) {
    difficulty = "Lätt";
  } else if (timeInMins <= 45) {
    difficulty = "Medel";
  } else {
    difficulty = "Svår";
  }

  return (
    <p className="recipe-difficulty">
      <strong>Svårighetsgrad:</strong> {difficulty}
    </p>
  );
};

export default RecipeDifficulty;
