import { test, expect } from '@playwright/test';

test.describe('Star Rating', () => {
  test('user can submit a star rating', async ({ page }) => {
    // Go to your app (adjust URL/route if needed)
    await page.goto('http://localhost:5173/recipe/68ed029a8a8cd70776d90e3c');

    // Find the stars (they are ★ spans)
    const stars = page.locator('span', { hasText: '★' });

    // Click the 4th star
    await stars.nth(3).click();

    // Expect the thank-you message to appear
    await expect(page.getByText(/Tack för ditt betyg!/i)).toBeVisible();

    // Optionally check that the message includes the rating
    await expect(page.getByText(/4 stjärnor/)).toBeVisible();
  });
});
