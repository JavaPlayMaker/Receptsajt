import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";

// Mock fetch globally
const mockRecipes = [
  {
    _id: "68ed014d8a8cd70776d9082a",
    title: "Regnbågsrulle",
    description: "A colorful sushi roll",
    imageUrl: "http://example.com/rainbow.jpg",
    timeInMins: 30,
    price: 120,
  },
  {
    _id: "random123",
    title: "Other Roll",
    description: "Another recipe",
    imageUrl: "http://example.com/other.jpg",
    timeInMins: 20,
    price: 80,
  },
];

describe("Home component", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockRecipes),
      })
    );
  });

  it("renders loading state", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText(/Recept laddar/i)).toBeInTheDocument();
  });

  it("renders favorite and other recipes after fetch", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText("Våra favoritrecept:")).toBeInTheDocument()
    );

    expect(screen.getByText("Regnbågsrulle")).toBeInTheDocument();
    expect(screen.getByText("Other Roll")).toBeInTheDocument();
  });

  it("filters recipes when searching (via Enter key)", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("Regnbågsrulle"));

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Other" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(screen.queryByText("Regnbågsrulle")).not.toBeInTheDocument();
    expect(screen.getByText("Other Roll")).toBeInTheDocument();
  });

  it("renders error state if fetch fails", async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error("Network error")));

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/Error: Network error/i)).toBeInTheDocument()
    );
  });
});
