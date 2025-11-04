import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../layout/Navbar"; // adjust path if needed
import * as api from "../services/api";

describe("Navbar", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders logo and home link", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByAltText(/RICE N ROLL/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Hem" })).toBeInTheDocument();
  });

  it("shows categories when dropdown is opened", async () => {
    // mock categories and recipes
    vi.spyOn(api, "getAllCategories").mockResolvedValue(["Sushi", "Ramen"]);
    vi.spyOn(api, "getRecipesByCategory").mockResolvedValue([
      { id: 1 },
      { id: 2 },
    ]);

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // open dropdown
    fireEvent.click(screen.getByRole("button", { name: /Kategorier/i }));

    // categories should appear
    await waitFor(() => {
      expect(screen.getByRole("menu")).toBeInTheDocument();
      expect(
        screen.getByRole("menuitem", { name: /Sushi/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("menuitem", { name: /Ramen/i })
      ).toBeInTheDocument();
    });

    // assert counts separately
    const sushiItem = screen.getByRole("menuitem", { name: /Sushi/i });
    expect(sushiItem).toHaveTextContent("Sushi");
    expect(sushiItem).toHaveTextContent("2");
  });

  it("shows fallback when no categories", async () => {
    vi.spyOn(api, "getAllCategories").mockResolvedValue([]);

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /Kategorier/i }));

    await waitFor(() =>
      expect(screen.getByText(/Inga kategorier/i)).toBeInTheDocument()
    );
  });
});
