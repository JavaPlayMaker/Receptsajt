import { render, screen } from '@testing-library/react'
import App from './App'
import { MemoryRouter } from 'react-router-dom'
import { execPath } from 'process';

test("Renders Home component at default route", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/Välkommen till Receptsajten/i)).toBeInTheDocument();
});


test("renders Recipe component for /recipe/:id", () => {
  render(
    <MemoryRouter initialEntries={["/recipe/123"]}>
      <App />
    </MemoryRouter>
  );

    expect(screen.getByText(/laddar recept/i)).toBeInTheDocument();
});

test("renders Category component for /category/:category", () => {
  render(
    <MemoryRouter initialEntries={["/category/desserts"]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/kategori/i)).toBeInTheDocument();
});

test("renders ThreatChecklist component for /threat-checklist", () => {
  render(
    <MemoryRouter initialEntries={["/threat-checklist"]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/hotchecklista/i)).toBeInTheDocument();
});