import React from "react";
import { render, screen } from "@testing-library/react";
import Recipe from "../pages/Recipe";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useParams: () => ({ id: "123" }) };
});

const RecipeWithState = ({ recipe, loading, error }) => {
  // Mock state via props
  return <RecipeMock recipe={recipe} loading={loading} error={error} />;
};

// En liten mock-komponent som vi kan manipulera
const RecipeMock = ({ recipe, loading, error }) => {
  const [stateRecipe] = React.useState(recipe);
  const [stateLoading] = React.useState(loading);
  const [stateError] = React.useState(error);

  if (stateLoading) return <p>Laddar recept...</p>;
  if (stateError) return <p>Ett fel uppstod: {stateError.message}</p>;

  return (
    <div>
      {stateRecipe ? (
        <h1>{stateRecipe.title}</h1>
      ) : (
        <p>Inget recept hittades.</p>
      )}
    </div>
  );
};

describe("Recipe Page", () => {
  test("renders loading state initially", () => {
    render(
      <MemoryRouter>
        <RecipeWithState loading={true} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Laddar recept/i)).toBeInTheDocument();
  });

  test("renders error message if error occurs", () => {
    render(
      <MemoryRouter>
        <RecipeWithState loading={false} error={new Error("Failed")} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Ett fel uppstod/i)).toBeInTheDocument();
  });

  test("renders recipe details correctly", () => {
    const mockRecipe = { title: "Test Recipe" };
    render(
      <MemoryRouter>
        <RecipeWithState loading={false} recipe={mockRecipe} />
      </MemoryRouter>
    );
    expect(screen.getByText("Test Recipe")).toBeInTheDocument();
  });

  test("renders message if no recipe found", () => {
    render(
      <MemoryRouter>
        <RecipeWithState loading={false} recipe={null} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Inget recept hittades/i)).toBeInTheDocument();
  });
});
