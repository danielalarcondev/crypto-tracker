import { Page, expect, test } from '@playwright/test';
import { ASSETS_ENDPOINT, mockAssetsRequest } from '@services/assets/utils';
import { LARGE_SCREEN, SMALL_SCREEN, mockedAssets } from '@tests/utils';

test.describe('Header: ', () => {

    test.beforeEach(({ page }) => {
        mockAssetsRequest(page);
    });

    test('should render menu for large screens', async ({ page }) => {

        await page.setViewportSize(LARGE_SCREEN);

        await page.goto('http://localhost:3000/');
        await page.evaluate(() => document.fonts.ready);
	
        const menuButton = await page.getByTestId('header-menu-button');
        const menuUl = await page.getByTestId('header-ul');
        const settingsIcon = await page.getByTestId('header-settings-icon');
	
        await expect(page.locator('.header')).toHaveScreenshot();
		
        await expect(menuUl).toBeVisible();
        await expect(settingsIcon).toBeVisible();
        await expect(menuButton).toBeHidden();
    });

    test('should render menu for small screens ', async ({ page }) => {

        await page.setViewportSize(SMALL_SCREEN);

        await page.goto('http://localhost:3000/');
        await page.evaluate(() => document.fonts.ready);
	
        const menuButton = await page.getByTestId('header-menu-button');
        const menuUl = await page.getByTestId('header-ul');
        const settingsIcon = await page.getByTestId('header-settings-icon');
	
        await expect(page.locator('.header')).toHaveScreenshot();

        await expect(menuUl).toBeHidden();
        await expect(settingsIcon).toBeHidden();
        await expect(menuButton).toBeVisible();
    });

    test('should open and close menu ', async ({ page }) => {

        await page.setViewportSize(SMALL_SCREEN);

        await page.goto('http://localhost:3000/');
        await page.evaluate(() => document.fonts.ready);

        const nav = await page.getByTestId('header-nav');

        expect(await nav.locator('.nav-menu-open')).toBeHidden();
		
        await page.getByTestId('header-menu-button').click();
        expect(await page.evaluate(() => document.querySelector('.nav-menu-open'))).toBeDefined();
        await expect(page.locator('.header')).toHaveScreenshot('menu-open.png');
		
        await page.getByTestId('header-menu-button').click();
        expect(await nav.locator('.nav-menu-open')).toBeHidden();
        await expect(page.locator('.header')).toHaveScreenshot('menu-closed.png');
    });
});
 
