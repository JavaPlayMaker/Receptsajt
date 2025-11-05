import { test, expect } from '@playwright/test';

test.describe('Category Page – Sushi', () => {
  test.beforeEach(async ({ page }) => {
    // 👇 Update port if your dev server runs on a different one
    await page.goto('http://localhost:5173/category/sushi');
  });

  test('should display sushi title and recipe list', async ({ page }) => {
    // ✅ Check page title
    await expect(page.locator('h1')).toHaveText(/Sushi/i);

    // ✅ Count recipes
    const recipeCount = await page.locator('.category-list li').count();
    console.log(`Found ${recipeCount} sushi recipes.`);

    if (recipeCount > 0) {
      // ✅ Verify recipe details
      await expect(page.locator('.category-list li h3').first()).toBeVisible();
      await expect(page.locator('.category-list li img').first()).toBeVisible();

      // ✅ Check that at least one time/price paragraph exists
      const timeParagraphs = page.locator('.category-list li p', { hasText: /⏱/ });
      await expect(timeParagraphs.first()).toBeVisible();
      expect(await timeParagraphs.count()).toBeGreaterThan(0);

      // Optional: log first recipe title for debugging
      const firstTitle = await page.locator('.category-list li h3').first().textContent();
      console.log(`🧾 First recipe: ${firstTitle}`);
    } else {
      // ✅ Fallback text when no recipes exist
      await expect(page.locator('text=Inga recept i denna kategori.')).toBeVisible();
    }
  });

  test('should navigate to a sushi recipe when clicked', async ({ page }) => {
    const firstRecipe = page.locator('.category-list li a').first();

    if (await firstRecipe.count()) {
      const href = await firstRecipe.getAttribute('href');
      console.log(`➡️ Navigating to recipe: ${href}`);

      await firstRecipe.click();

      // ✅ Expect to land on a recipe page
      await expect(page).toHaveURL(/\/recipe\//);
      await expect(page.locator('h1')).toBeVisible();
    } else {
      test.skip('No sushi recipes found to test navigation.');
    }
  });

  test('should show error message if API request fails', async ({ page, context }) => {
    // 🎭 Mock API failure for sushi category
    await context.route('**/categories/sushi/recipes', route =>
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Server Error' }),
      })
    );

    await page.goto('http://localhost:5173/category/sushi');

    // ✅ Expect error message
    await expect(page.locator('text=Error:')).toBeVisible();
  });

  test('should render mock sushi recipes when API is mocked', async ({ page, context }) => {
    // 🎭 Mock successful sushi API with sample data
    await context.route('**/categories/sushi/recipes', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            _id: 'sushi1',
            title: 'California Roll',
            description: 'A tasty roll with crab and avocado.',
            imageUrl: '/uploads/california.jpg',
            timeInMins: 25,
            price: 120,
          },
          {
            _id: 'sushi2',
            title: 'Spicy Tuna Roll',
            description: 'Fresh tuna with a hint of chili.',
            imageUrl: '/uploads/spicytuna.jpg',
            timeInMins: 30,
            price: 140,
          },
        ]),
      })
    );

    await page.goto('http://localhost:5173/category/sushi');

    // ✅ Verify mock recipes render
    await expect(page.locator('h3', { hasText: 'California Roll' })).toBeVisible();
    await expect(page.locator('h3', { hasText: 'Spicy Tuna Roll' })).toBeVisible();

    // ✅ Verify details
    await expect(page.locator('text=⏱ 25 min')).toBeVisible();
    await expect(page.locator('text=💰 120 SEK')).toBeVisible();
  });
});
