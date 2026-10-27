const { test, expect } = require('@playwright/test');

test('renders a local page', async ({ page }) => {
  await page.setContent('<h1>Composite Actions POC</h1>');
  await expect(page.getByRole('heading', { name: 'Composite Actions POC' })).toBeVisible();
});
