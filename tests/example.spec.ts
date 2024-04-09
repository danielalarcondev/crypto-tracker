import { expect, test } from '@playwright/test';
 
test('should navigate to the assets page', async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto('http://localhost:3000/');
    // Find an element with the text 'About' and click on it
    await page.click('text=Assets');
    // The new URL should be "/about" (baseURL is used there)
    await expect(page).toHaveURL('http://localhost:3000/assets');
    // The new page should contain an h1 with "About"
    await expect(page.locator('h1')).toContainText('Hey, this is the assets section');
});
