import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("renders recipes after loading", async ({ page }) => {
    await page.goto("http://localhost:5173/"); // adjust to your dev server

    // Wait for the favorites section to appear
    await expect(page.getByText("Våra favoritrecept:")).toBeVisible();

    // Check that at least one pinned recipe is visible
    await expect(page.getByText("Regnbågsrulle")).toBeVisible();
  });

  test("can search for a recipe by pressing Enter", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    // Fill the search input
    const input = page.getByPlaceholder("Sök:");
    await input.fill("tonfisk");

    // Press Enter to trigger search
    await input.press("Enter");

    // Verify results
    await expect(page.getByText("Tonfisk Nigiri")).toBeVisible();
    await expect(page.getByText("Regnbågsrulle")).not.toBeVisible();
  });

  test("navigates to recipe detail when clicking a link", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    // Click on a pinned recipe
    await page.getByText("Regnbågsrulle").click();

    // Verify navigation
    await expect(page).toHaveURL(/\/recipe\/68ed014d8a8cd70776d9082a/);
  });
});
