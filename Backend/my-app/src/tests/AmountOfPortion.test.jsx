import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AmountOfPortion from "../components/AmountOfPortion"; // adjust path if needed

describe("AmountOfPortion", () => {
  const mockRecipe = {
    ingredients: [
      { _id: "1", amount: 100, unit: "g", name: "Rice" },
      { _id: "2", amount: 2, unit: "pcs", name: "Eggs" },
    ],
  };

  it("renders loading state if no recipe is provided", () => {
    render(<AmountOfPortion recipe={null} />);
    expect(screen.getByText(/Laddar recept/i)).toBeInTheDocument();
  });

  it("renders ingredients with default portion = 1", () => {
    render(<AmountOfPortion recipe={mockRecipe} />);
    expect(screen.getByText("100 g Rice")).toBeInTheDocument();
    expect(screen.getByText("2 pcs Eggs")).toBeInTheDocument();
  });

  it("updates ingredient amounts when portion changes", () => {
    render(<AmountOfPortion recipe={mockRecipe} />);
    const input = screen.getByRole("spinbutton"); // number input

    // Change portion to 2
    fireEvent.change(input, { target: { value: "2" } });

    expect(screen.getByText("200 g Rice")).toBeInTheDocument();
    expect(screen.getByText("4 pcs Eggs")).toBeInTheDocument();
  });

  it("input reflects the updated portion value", () => {
    render(<AmountOfPortion recipe={mockRecipe} />);
    const input = screen.getByRole("spinbutton");

    fireEvent.change(input, { target: { value: "3" } });
    expect(input.value).toBe("3");
  });
});
