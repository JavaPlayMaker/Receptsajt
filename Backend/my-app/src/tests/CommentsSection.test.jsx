import { render, screen, fireEvent, act } from "@testing-library/react";
import { vi } from "vitest";
import CommentsSection from "../components/CommentsSection";

// Mock child components
vi.mock("../components/CommentForm", () => ({
  default: ({ onCommentAdded, resetTrigger }) => (
    <div>
      <button onClick={onCommentAdded}>Mock Add Comment</button>
      <span data-testid="form-reset">{resetTrigger}</span>
    </div>
  ),
}));

vi.mock("../components/CommentList", () => ({
  default: ({ refreshTrigger }) => (
    <div data-testid="comment-list">Refresh: {refreshTrigger}</div>
  ),
}));

describe("CommentsSection", () => {
  beforeEach(() => {
    vi.useFakeTimers(); // control setTimeout
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("renders CommentForm and CommentList", () => {
    render(<CommentsSection recipeId="123" />);

    expect(screen.getByText("Mock Add Comment")).toBeInTheDocument();
    expect(screen.getByTestId("comment-list")).toHaveTextContent("Refresh: 0");
  });

  it("increments refreshTrigger when a comment is added", () => {
    render(<CommentsSection recipeId="123" />);

    fireEvent.click(screen.getByText("Mock Add Comment"));

    // refreshTrigger should increment
    expect(screen.getByTestId("comment-list")).toHaveTextContent("Refresh: 1");
  });

  it("increments formResetTrigger after 5 seconds", () => {
    render(<CommentsSection recipeId="123" />);

    fireEvent.click(screen.getByText("Mock Add Comment"));

    // Initially resetTrigger is 0
    expect(screen.getByTestId("form-reset")).toHaveTextContent("0");

    // Advance timers by 5 seconds
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // Now resetTrigger should increment
    expect(screen.getByTestId("form-reset")).toHaveTextContent("1");
  });
});
