import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import React, { useState } from "react";
import SearchBar from "../components/SearchBar";

// Wrapper to manage state like in the real app
function Wrapper({ onSearch }) {
  const [query, setQuery] = useState("");
  return (
    <SearchBar
      searchQuery={query}
      setSearchQuery={setQuery}
      onSearch={onSearch}
    />
  );
}

describe("SearchBar", () => {
  it("updates searchQuery when typing", async () => {
    render(<Wrapper onSearch={() => {}} />);
    const input = screen.getByPlaceholderText("Sök:");

    await userEvent.type(input, "sushi");

    expect(input).toHaveValue("sushi");
  });

  it("calls onSearch when pressing Enter", async () => {
    const onSearch = vi.fn();
    render(<Wrapper onSearch={onSearch} />);
    const input = screen.getByPlaceholderText("Sök:");

    await userEvent.type(input, "{enter}");

    expect(onSearch).toHaveBeenCalled();
  });
});
