import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Recipe from "../pages/Recipe";
// Mock the API call, but don't want to actually hit the backend here
vi.mock("../services/api", () => ({
  getRecipe: vi.fn(),
}));

// Mock all child components – I only care that they show up, not how they work inside
vi.mock("../components/StarRating", () => ({
  default: () => <div data-testid="rating-stars" />,
}));
vi.mock("../components/RecipeDifficulty", () => ({
  default: () => <div data-testid="recipe-difficulty" />,
}));
vi.mock("../components/CommentsSection", () => ({
  default: () => <div data-testid="comments-section" />,
}));
vi.mock("../components/AmountOfPortion", () => ({
  default: () => <div data-testid="amount-of-portion" />,
}));
vi.mock("../components/ToDoList", () => ({
  default: () => <div data-testid="todo-list" />,
}));

// Import the mocked getRecipe so I can control its return value
import { getRecipe } from "../services/api";

// Helper to render with a fake router, beacuse Recipe uses useParam
const renderWithRouter = (ui, { route = "/recipe/1" } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/recipe/:id" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe("Recipe page", () => {
  // this make sure all mocks are reset before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1 – Loading state
  it("shows 'Recept laddar...' while the recipe is loading", () => {
    // Keep the promise pending so it never resolves
    getRecipe.mockReturnValue(new Promise(() => {}));
    renderWithRouter(<Recipe />);
    // Expect to see the loading message on the screen
    expect(screen.getByText("Recept laddar...")).toBeInTheDocument();
  });

  // Test 2 – Error state
  it("shows error message if API call fails", async () => {
    // API throwing an error
    getRecipe.mockRejectedValue(new Error("Serverfel"));
    renderWithRouter(<Recipe />);
    //  Error text with the message
    expect(await screen.findByText(/Error:/)).toBeInTheDocument();
    expect(screen.getByText(/Serverfel/)).toBeInTheDocument();
  });

  //Test 3 – No recipe found
  it("shows a message if no recipe is found", async () => {
    // API returns null = no recipe
    getRecipe.mockResolvedValue(null);
    renderWithRouter(<Recipe />);
    // Expect to see the fallback text
    expect(await screen.findByText("Inget recept hittades.")).toBeInTheDocument();
  });

  // Test 4 – Successful render
  it("renders recipe data correctly when fetch succeeds", async () => {
    // Mock a sample recipe object
    getRecipe.mockResolvedValue({
      _id: "1",
      title: "Pannkakor",
      description: "Goda och fluffiga",
      timeInMins: 20,
      price: 50,
      portions: 4,
      imageUrl: "pannkakor.jpg",
      instructions: ["Stek", "Servera"],
    });

    renderWithRouter(<Recipe />);

    // Wait for the recipe title to appear
    expect(await screen.findByText("Pannkakor")).toBeInTheDocument();
    // check key details
    expect(screen.getByText("Goda och fluffiga")).toBeInTheDocument();
    expect(screen.getByText(/20 min/)).toBeInTheDocument();
    expect(screen.getByText(/50 SEK/)).toBeInTheDocument();

    // Mocked child components are rendered
    expect(screen.getByTestId("rating-stars")).toBeInTheDocument();
    expect(screen.getByTestId("recipe-difficulty")).toBeInTheDocument();
    expect(screen.getByTestId("amount-of-portion")).toBeInTheDocument();
    expect(screen.getByTestId("todo-list")).toBeInTheDocument();
    expect(screen.getByTestId("comments-section")).toBeInTheDocument();
  });

  //Test 5 – Snapshot test
  it("matches snapshot when recipe renders correctly", async () => {
    // Mock another recipe
    getRecipe.mockResolvedValue({
      _id: "1",
      title: "Lasagne",
      description: "Krämig och god",
      timeInMins: 45,
      price: 80,
      portions: 4,
      imageUrl: "lasagne.jpg",
      instructions: ["Lägg lager", "Grädda"],
    });

    // Render and wait until it's loaded
    const { asFragment } = renderWithRouter(<Recipe />);
    await screen.findByText("Lasagne");

    // Take a snapshot to catch any UI changes later
    expect(asFragment()).toMatchSnapshot();
  });
});
