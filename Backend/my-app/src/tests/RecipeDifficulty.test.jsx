import React from "react";
import { render, screen } from "@testing-library/react";
import RecipeDifficulty from "../components/RecipeDifficulty";

describe("RecipeDifficulty component", () => {
  test("visar 'Lätt' när tiden är 20 minuter eller mindre", () => {
    render(<RecipeDifficulty timeInMins={15} />);
    expect(screen.getByText(/Lätt/i)).toBeInTheDocument();
  });

  test("visar 'Medel' när tiden är mellan 21 och 45 minuter", () => {
    render(<RecipeDifficulty timeInMins={30} />);
    expect(screen.getByText(/Medel/i)).toBeInTheDocument();
  });

  test("visar 'Svår' när tiden är över 45 minuter", () => {
    render(<RecipeDifficulty timeInMins={60} />);
    const difficultyEl = screen.getByText("Svår", { selector: "p" });
    expect(difficultyEl).toBeInTheDocument();
  });

  test("visar alltid etiketten 'Svårighetsgrad:'", () => {
    render(<RecipeDifficulty timeInMins={10} />);
    expect(screen.getByText(/Svårighetsgrad:/i)).toBeInTheDocument();
  });
});
