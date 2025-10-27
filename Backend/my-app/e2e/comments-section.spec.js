import { test, expect } from '@playwright/test';

test.describe('CommentsSection', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to a real recipe page (replace ID with one that exists in your DB)
    await page.goto('http://localhost:5173/recipe/68ed029a8a8cd70776d90e3c');
  });

  test('user can add a comment and see it appear', async ({ page }) => {
    // Fill in the form using labels
    await page.getByLabel('Namn:').fill('Playwright User');
    await page.getByLabel('Kommentar:').fill('This is a test comment');

    // Submit the form
    await page.getByRole('button', { name: 'Skicka' }).click();

    // Expect thank‑you message
    await expect(page.getByText('Tack för din kommentar!')).toBeVisible();

    // After the thank‑you message, the form resets and CommentList refreshes.
    // Wait for the new comment to appear in the list
    await expect(page.getByText('This is a test comment').last()).toBeVisible();
  });
});
