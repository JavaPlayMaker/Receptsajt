import { test, expect } from "@playwright/test";

test.describe("Navbar", () => {
  test("shows logo and home link", async ({ page }) => {
    await page.goto("http://localhost:5173/"); // adjust port
    await expect(page.getByAltText("RICE N ROLL").first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Hem" })).toBeVisible();
  });

  test("opens and closes category dropdown", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    const dropdownBtn = page.getByRole("button", { name: /Kategorier/i });
    await dropdownBtn.click();

    await expect(page.getByRole("menu")).toBeVisible();

    // click outside to close
    await page.click("body");
    await expect(page.getByRole("menu")).toHaveCount(0);
  });

  test("navigates to category page when clicking a category", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    await page.getByRole("button", { name: /Kategorier/i }).click();

    // Wait for at least one category link
    const firstCategory = page.locator(".dropdown-menu a").first();
    await firstCategory.click();

    await expect(page).toHaveURL(/\/category\//);
  });
});
