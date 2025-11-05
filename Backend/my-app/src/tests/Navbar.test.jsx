import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../layout/Navbar"; 
import * as api from "../services/api";

// Mock image import so tests don’t break
vi.mock("../assets/logo.png", () => ({
  default: "logo.png",
}));

// ✅ Mock CategoryDropdown
vi.mock("../layout/CategoryDropdown", () => ({
  __esModule: true,
  default: ({ isOpen, categories = [], onToggle }) => (
    <div data-testid="category-dropdown">
      <button onClick={onToggle}>🍣 Sushi Categories</button>
      {isOpen &&
        categories.map((c) => (
          <div key={c.name || c}>{c.name || c}</div>
        ))}
    </div>
  ),
}));

describe("🍣 Navbar Component (Sushi Recipe Site)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders sushi site logo and 'Hem' link", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Logo
    expect(screen.getByAltText(/RICE N ROLL/i)).toBeInTheDocument();

    // Home link
    expect(screen.getByText("Hem")).toBeInTheDocument();
  });

  it("fetches and displays sushi categories when dropdown opens", async () => {
    // Mock sushi categories
    vi.spyOn(api, "getAllCategories").mockResolvedValue([
      { name: "Maki" },
      { name: "Nigiri" },
      { name: "Sashimi" },
    ]);

    vi.spyOn(api, "getRecipesByCategory").mockResolvedValue([]);

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // Ensure categories fetched
    await waitFor(() => expect(api.getAllCategories).toHaveBeenCalled());

    // Find dropdown toggle
    const toggleBtn = await screen.findByText("🍣 Sushi Categories");
    expect(toggleBtn).toBeInTheDocument();

    // Click to open dropdown
    fireEvent.click(toggleBtn);

    await waitFor(() => {
      expect(screen.getByText("Maki")).toBeInTheDocument();
      expect(screen.getByText("Nigiri")).toBeInTheDocument();
      expect(screen.getByText("Sashimi")).toBeInTheDocument();
    });
  });

  it("closes dropdown when clicking outside", async () => {
    vi.spyOn(api, "getAllCategories").mockResolvedValue([{ name: "Nigiri" }]);
    vi.spyOn(api, "getRecipesByCategory").mockResolvedValue([]);

    render(
      <MemoryRouter>
        <div data-testid="outside">Outside area</div>
        <Navbar />
      </MemoryRouter>
    );

    const toggleBtn = await screen.findByText("🍣 Sushi Categories");
    fireEvent.click(toggleBtn);
    expect(screen.getByText("Nigiri")).toBeInTheDocument();

    // Click outside
    fireEvent.click(screen.getByTestId("outside"));

    await waitFor(() => {
      expect(screen.queryByText("Nigiri")).not.toBeInTheDocument();
    });
  });

  it("fetches recipe counts for each sushi category when opened", async () => {
    vi.spyOn(api, "getAllCategories").mockResolvedValue([
      { name: "Maki" },
      { name: "Temaki" },
    ]);

    const getRecipesSpy = vi
      .spyOn(api, "getRecipesByCategory")
      .mockResolvedValueOnce([{}, {}, {}]) // Maki has 3 recipes
      .mockResolvedValueOnce([{}]); // Temaki has 1 recipe

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    await waitFor(() => expect(api.getAllCategories).toHaveBeenCalled());

    const toggleBtn = await screen.findByText("🍣 Sushi Categories");
    fireEvent.click(toggleBtn);

    await waitFor(() => expect(getRecipesSpy).toHaveBeenCalledTimes(2));
  });
});
