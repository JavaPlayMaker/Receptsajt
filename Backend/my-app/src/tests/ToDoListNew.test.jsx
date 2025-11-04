import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import ToDoListNew from "../components/ToDoList";

describe("ToDoListNew", () => {
  const instructions = [
    "Koka sushiris",
    "Blanda risvinäger, socker och salt i riset",
    "Skär laxen i tunna skivor",
    "Rulla ihop med nori och fyllning",
    "Skär rullarna i bitar och servera"
  ];

  it("renders all sushi steps with checkboxes", () => {
    render(<ToDoListNew instructions={instructions} />);

    instructions.forEach((step, index) => {
      expect(screen.getByLabelText(`${index + 1}. ${step}`)).toBeInTheDocument();
    });

    expect(screen.getByText("0 / 5 steg avklarade!")).toBeInTheDocument();
  });

  it("updates progress when a sushi step is checked", async () => {
    render(<ToDoListNew instructions={instructions} />);

    const firstCheckbox = screen.getByLabelText("1. Koka sushiris");
    await userEvent.click(firstCheckbox);

    expect(firstCheckbox).toBeChecked();
    expect(screen.getByText("1 / 5 steg avklarade!")).toBeInTheDocument();
  });

  it("toggles a sushi step off when unchecked again", async () => {
    render(<ToDoListNew instructions={instructions} />);

    const firstCheckbox = screen.getByLabelText("1. Koka sushiris");

    await userEvent.click(firstCheckbox);
    expect(screen.getByText("1 / 5 steg avklarade!")).toBeInTheDocument();

    await userEvent.click(firstCheckbox);
    expect(firstCheckbox).not.toBeChecked();
    expect(screen.getByText("0 / 5 steg avklarade!")).toBeInTheDocument();
  });
});
