import { render, screen } from "@testing-library/react";
import StarRating from "../components/StarRating";
import { vi } from "vitest";

vi.mock("../services/api", () => ({
  postRating: vi.fn(),
}));

describe("StarRating", () => {
  it("renders 5 stars", () => {
    render(<StarRating recipeId={1} />);
    const stars = screen.getAllByText("★");
    expect(stars).toHaveLength(5);
  });
});
