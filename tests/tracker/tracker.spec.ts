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

    test('page param change triggers content update', async ({ page }) => {

        await page.setViewportSize(LARGE_SCREEN);

        await page.goto('http://localhost:3000/');
        await page.evaluate(() => document.fonts.ready);
	
        const trackerTable = page.getByTestId('tracker-table');

        const initialTable = await trackerTable.textContent();
        await page.goto('http://localhost:3000/tracker?page=2');
       	
        await expect(async () => {
            await expect(initialTable).not.toStrictEqual(await trackerTable.textContent());
        }).toPass();
    });

    test('go back should load proper content', async ({ page }) => {

        await page.setViewportSize(LARGE_SCREEN);

        await page.goto('http://localhost:3000/');
        await page.evaluate(() => document.fonts.ready);
	
        const trackerTable = page.getByTestId('tracker-table');

        const initialTable = await trackerTable.textContent();
        await page.goto('http://localhost:3000/tracker?page=2');

        await expect(async () => {
            await expect(initialTable).not.toStrictEqual(await trackerTable.textContent());
        }).toPass();

        await page.goBack();
       	
        await expect(async () => {
            await expect(initialTable).toStrictEqual(await trackerTable.textContent());
        }).toPass();
    });

    test('go forward should load proper content', async ({ page }) => {

        await page.setViewportSize(LARGE_SCREEN);

        await page.goto('http://localhost:3000/');
        await page.evaluate(() => document.fonts.ready);
	
        const trackerTable = page.getByTestId('tracker-table');

        await page.goto('http://localhost:3000/tracker?page=3');
        const page3 = await trackerTable.textContent();
        
        await page.goBack();

        await expect(async () => {
            await expect(page3).not.toStrictEqual(await trackerTable.textContent());
        }).toPass();

        await page.goForward();
       	
        await expect(async () => {
            await expect(page3).toStrictEqual(await trackerTable.textContent());
        }).toPass();

    });

    test('should load page specified in url param', async ({ page }) => {

        await page.setViewportSize(LARGE_SCREEN);

        await page.goto('http://localhost:3000/tracker?page=4');
        await page.evaluate(() => document.fonts.ready);
	
        const trackerPagination = page.getByTestId('tracker-pagination');
		
        const page1Button = trackerPagination.getByText('1', { exact: true });
        const page1LiParent = page1Button.locator('..');

        const page4Button = trackerPagination.getByText('4', { exact: true });
        const page4LiParent = page4Button.locator('..');

        await expect(page4LiParent).toHaveAttribute('aria-current', 'page');
        await expect(page1LiParent).not.toHaveAttribute('aria-current', 'page');
    });

});
