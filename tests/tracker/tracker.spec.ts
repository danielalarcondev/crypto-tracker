import { expect, test } from '@playwright/test';
import { LARGE_SCREEN } from '@tests/utils';

test.describe('Tracker: ', () => {

    test('should load tracker correctly', async ({ page }) => {

        await page.setViewportSize(LARGE_SCREEN);

        await page.goto('http://localhost:3000/');
        await page.evaluate(() => document.fonts.ready);
	
        const tracker = page.getByTestId('tracker');
        const trackerTable = page.getByTestId('tracker-table');
        const trackerPagination = page.getByTestId('tracker-pagination');

        await expect(tracker).toBeVisible();
        await expect(trackerTable).toBeVisible();
        await expect(trackerPagination).toBeVisible();
    });

    test('page navigation triggers content update', async ({ page }) => {

        await page.setViewportSize(LARGE_SCREEN);

        await page.goto('http://localhost:3000/');
        await page.evaluate(() => document.fonts.ready);
	
        const trackerTable = page.getByTestId('tracker-table');
        const trackerPagination = page.getByTestId('tracker-pagination');

        const initialTable = await trackerTable.textContent();
        const page2Button = trackerPagination.getByText('2', { exact: true });
       	
        await page2Button.click();

        await expect(async () => {
            await expect(initialTable).not.toStrictEqual(await trackerTable.textContent());
        }).toPass();
    });
});
