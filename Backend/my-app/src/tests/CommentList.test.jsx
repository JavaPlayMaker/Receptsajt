import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import CommentList from "../components/CommentList"; // adjust path if needed
import { getComments } from "../services/api";
import { vi } from "vitest";

// Mock the API
vi.mock("../services/api", () => ({
  getComments: vi.fn(),
}));

describe("CommentList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders 'Inga kommentarer ännu.' when no comments", async () => {
    getComments.mockResolvedValueOnce([]);

    render(<CommentList recipeId="1" />);

    await waitFor(() =>
      expect(screen.getByText(/Inga kommentarer ännu/i)).toBeInTheDocument()
    );
  });

  it("renders first 3 comments by default", async () => {
    const fakeComments = Array.from({ length: 5 }, (_, i) => ({
      _id: String(i),
      name: `User ${i}`,
      comment: `Comment ${i}`,
      createdAt: new Date().toISOString(),
    }));

    getComments.mockResolvedValueOnce(fakeComments);

   const { container } = render(<CommentList recipeId="1" />);

    // Wait until 3 comments are rendered
  await waitFor(() =>
    expect(container.querySelectorAll(".comment-text").length).toBe(3)
  );

  // Button should be visible
  expect(
    screen.getByRole("button", { name: /visa fler kommentarer/i })
  ).toBeInTheDocument();
});

it("loads more comments when 'Visa fler kommentarer +' is clicked", async () => {
  const fakeComments = Array.from({ length: 5 }, (_, i) => ({
    _id: String(i),
    name: `User ${i}`,
    comment: `Comment ${i}`,
    createdAt: new Date().toISOString(),
  }));

  getComments.mockResolvedValueOnce(fakeComments);

   
const { container } = render(<CommentList recipeId="1" />);

  // Wait until 3 comments are rendered
  await waitFor(() =>
    expect(container.querySelectorAll(".comment-text").length).toBe(3)
  );

  // Click "Visa fler kommentarer"
  fireEvent.click(
    screen.getByRole("button", { name: /visa fler kommentarer/i })
  );

  // Now all 5 comments should be visible
  expect(container.querySelectorAll(".comment-text").length).toBe(5);

  // Button should disappear
  expect(
    screen.queryByRole("button", { name: /visa fler kommentarer/i })
  ).not.toBeInTheDocument();
});
});