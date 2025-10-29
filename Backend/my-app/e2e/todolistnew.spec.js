import { test, expect } from "@playwright/test";

test.describe("ToDoListNew (Sushi Recipe)", () => {
  test("user can check and uncheck steps", async ({ page }) => {
    await page.goto('http://localhost:5173/recipe/68ed029a8a8cd70776d90e3c');

    // Progress starts at 0
    await expect(page.locator("text=0 / 5 steg avklarade!")).toBeVisible();

    // Click the first step
    const firstStep = page.getByLabel("1. Koka sushiris");
    await firstStep.check();

    // Progress updates
    await expect(page.locator("text=1 / 5 steg avklarade!")).toBeVisible();

    // Uncheck again
    await firstStep.uncheck();
    await expect(page.locator("text=0 / 5 steg avklarade!")).toBeVisible();
  });
});
