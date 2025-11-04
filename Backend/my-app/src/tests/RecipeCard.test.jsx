import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import RecipeCard from "../components/RecipeCard"; // adjust path if needed

describe("RecipeCard", () => {
  const mockRecipe = {
    _id: "abc123",
    title: "Test Recipe",
    description: "A delicious test recipe",
    imageUrl: "http://example.com/test.jpg",
  };

  it("renders nothing if recipe is null", () => {
    const { container } = render(
      <MemoryRouter>
        <RecipeCard recipe={null} />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders title and description", () => {
    render(
      <MemoryRouter>
        <RecipeCard recipe={mockRecipe} />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Recipe")).toBeInTheDocument();
    expect(screen.getByText("A delicious test recipe")).toBeInTheDocument();
  });

  it("renders image when imageUrl is provided", () => {
    render(
      <MemoryRouter>
        <RecipeCard recipe={mockRecipe} />
      </MemoryRouter>
    );

    const img = screen.getByRole("img", { name: /test recipe/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockRecipe.imageUrl);
  });

  it("does not render image if imageUrl is missing", () => {
    const recipeWithoutImage = { ...mockRecipe, imageUrl: "" };

    render(
      <MemoryRouter>
        <RecipeCard recipe={recipeWithoutImage} />
      </MemoryRouter>
    );

    expect(screen.queryByRole("img")).toBeNull();
  });

  it("links to the correct recipe detail page", () => {
    render(
      <MemoryRouter>
        <RecipeCard recipe={mockRecipe} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /test recipe/i });
    expect(link).toHaveAttribute("href", `/recipe/${mockRecipe._id}`);
  });
});
