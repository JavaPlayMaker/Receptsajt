import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Category from "../pages/Category"; 
import * as api from "../services/api";

// 🧩 Mock RecipeDifficulty component
vi.mock("../components/RecipeDifficulty", () => ({
  __esModule: true,
  default: ({ timeInMins }) => <div data-testid="difficulty">Time: {timeInMins} min</div>,
}));

// 🧩 Mock useParams to control the category name
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useParams: () => ({ category: "maki" }),
  };
});

describe("🍣 Category Component (Sushi Recipes)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state while fetching recipes", async () => {
    vi.spyOn(api, "getRecipesByCategory").mockReturnValue(
      new Promise(() => {}) // never resolves to keep loading
    );

    render(
      <MemoryRouter>
        <Category />
      </MemoryRouter>
    );

    expect(screen.getByText("Laddar recept...")).toBeInTheDocument();
  });

  it("renders sushi recipes when data is fetched", async () => {
    vi.spyOn(api, "getRecipesByCategory").mockResolvedValue([
      {
        _id: "1",
        title: "California Maki",
        description: "Rulle med krabba, avokado och gurka.",
        imageUrl: "/images/maki.jpg",
        timeInMins: 30,
        price: 80,
      },
      {
        _id: "2",
        title: "Spicy Tuna Maki",
        description: "Klassisk rulle med tonfisk och chili.",
        imageUrl: "/images/tuna.jpg",
        timeInMins: 25,
        price: 90,
      },
    ]);

    render(
      <MemoryRouter>
        <Category />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Maki")).toBeInTheDocument(); // Title case
      expect(screen.getByText("California Maki")).toBeInTheDocument();
      expect(screen.getByText("Spicy Tuna Maki")).toBeInTheDocument();
      expect(screen.getByText("⏱ 30 min | 💰 80 SEK")).toBeInTheDocument();
      expect(screen.getByText("⏱ 25 min | 💰 90 SEK")).toBeInTheDocument();
      expect(screen.getAllByTestId("difficulty").length).toBe(2);
    });
  });

  it("shows message when no recipes exist in this sushi category", async () => {
    vi.spyOn(api, "getRecipesByCategory").mockResolvedValue([]);

    render(
      <MemoryRouter>
        <Category />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText("Inga recept i denna kategori.")).toBeInTheDocument()
    );
  });

  it("displays error message if API call fails", async () => {
    vi.spyOn(api, "getRecipesByCategory").mockRejectedValue(
      new Error("Servern svarade inte")
    );

    render(
      <MemoryRouter>
        <Category />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/Error: Servern svarade inte/i)).toBeInTheDocument()
    );
  });
});
