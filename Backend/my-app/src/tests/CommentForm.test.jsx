import { render, screen, fireEvent } from "@testing-library/react";
import CommentForm from "../components/CommentForm"; // adjust path if needed
import { postComment } from "../services/api";
import { vi } from "vitest";

vi.mock("../services/api", () => ({
  postComment: vi.fn(),
}));


describe("CommentForm", () => {
  it("shows validation errors if fields are empty", async () => {
    render(<CommentForm recipeId={1} />);

    fireEvent.click(screen.getByRole("button", { name: /skicka/i }));

    expect(await screen.findByText("Namn krävs")).toBeInTheDocument();
    expect(await screen.findByText("Kommentar krävs")).toBeInTheDocument();
  });

  it("submits successfully and shows thank you message", async () => {
    const mockComment = { id: 1, name: "Alice", comment: "Hej!" };
    postComment.mockResolvedValueOnce(mockComment);

    render(<CommentForm recipeId={1} />);

    fireEvent.change(screen.getByLabelText(/namn/i), {
      target: { value: "Alice" },
    });
    fireEvent.change(screen.getByLabelText(/kommentar/i), {
      target: { value: "Hej!" },
    });

    fireEvent.click(screen.getByRole("button", { name: /skicka/i }));

    // Wait for success message
    expect(await screen.findByText(/tack för din kommentar!/i)).toBeInTheDocument();

    // Ensure API was called correctly
    expect(postComment).toHaveBeenCalledWith(1, "Alice", "Hej!");
  });

  it("shows API error if submission fails", async () => {
    postComment.mockRejectedValueOnce(new Error("API error"));

    render(<CommentForm recipeId={1} />);

    fireEvent.change(screen.getByLabelText(/namn/i), {
      target: { value: "Bob" },
    });
    fireEvent.change(screen.getByLabelText(/kommentar/i), {
      target: { value: "Hej hej" },
    });

    fireEvent.click(screen.getByRole("button", { name: /skicka/i }));

    expect(
      await screen.findByText(/kommentarer kunde inte skickas/i)
    ).toBeInTheDocument();
  });

  it("resets form when resetTrigger changes", async () => {
    const { rerender } = render(<CommentForm recipeId={1} resetTrigger={0} />);

    fireEvent.change(screen.getByLabelText(/namn/i), {
      target: { value: "Charlie" },
    });
    fireEvent.change(screen.getByLabelText(/kommentar/i), {
      target: { value: "Hej hej hej" },
    });

    // Trigger reset by changing prop
    rerender(<CommentForm recipeId={1} resetTrigger={1} />);

    expect(screen.getByLabelText(/namn/i)).toHaveValue("");
    expect(screen.getByLabelText(/kommentar/i)).toHaveValue("");
  });
});

