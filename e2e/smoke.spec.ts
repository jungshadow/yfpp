import { test, expect } from '@playwright/test';

test('homepage loads with logo and search form', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText(/Fucking/i);
    await expect(page.locator('form')).toBeVisible();
});
