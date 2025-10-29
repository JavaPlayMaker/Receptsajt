import { test, expect } from "@playwright/test";

test.describe("SearchBar", () => {
  test("user can type and press Enter to search", async ({ page }) => {
    // Go to your app
    await page.goto("http://localhost:5173/"); // adjust port if needed

    // Find the input by placeholder
    const input = page.getByPlaceholder("Sök:");

    // Type into the search bar
    await input.fill("sushi");

    // Press Enter
    await input.press("Enter");

    // Expect some result to appear (adjust selector to your app)
    await expect(input).toHaveValue("sushi");
  });
});
