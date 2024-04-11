import { XS_MEDIA_QUERY } from '@components/header/use-header-scroll/use-header-scroll';
import { expect, test } from '@playwright/test';

const ONE_PX = 1;
const SMALL_SCREEN_WIDTH = (XS_MEDIA_QUERY - ONE_PX);
const LARGE_SCREEN_WIDTH = 1920;

test.describe('Header: ', () => {
    test('should render menu for large screens', async ({ page }) => {

        await page.setViewportSize({
            width: LARGE_SCREEN_WIDTH,
            height: 1080,
        });

        await page.goto('http://localhost:3000/');
        await page.evaluate(() => document.fonts.ready);
	
        const menuButton = await page.getByTestId('header-menu-button');
        const menuUl = await page.getByTestId('header-ul');
        const settingsIcon = await page.getByTestId('header-settings-icon');
	
        await expect(page).toHaveScreenshot();
		
        await expect(menuUl).toBeVisible();
        await expect(settingsIcon).toBeVisible();
        await expect(menuButton).toBeHidden();
    });

    test('should render menu for small screens ', async ({ page }) => {

        await page.setViewportSize({
            width: SMALL_SCREEN_WIDTH,
            height: 900,
        });

        await page.goto('http://localhost:3000/');
        await page.evaluate(() => document.fonts.ready);
	
        const menuButton = await page.getByTestId('header-menu-button');
        const menuUl = await page.getByTestId('header-ul');
        const settingsIcon = await page.getByTestId('header-settings-icon');
	
        await expect(page).toHaveScreenshot();

        await expect(menuUl).toBeHidden();
        await expect(settingsIcon).toBeHidden();
        await expect(menuButton).toBeVisible();
    });

    test('should open and close menu ', async ({ page }) => {

        await page.setViewportSize({
            width: SMALL_SCREEN_WIDTH,
            height: 900,
        });

        await page.goto('http://localhost:3000/');
        await page.evaluate(() => document.fonts.ready);

        const nav = await page.getByTestId('header-nav');

        expect(await nav.locator('.nav-menu-open')).toBeHidden();
		
        await page.getByTestId('header-menu-button').click();
        expect(await page.evaluate(() => document.querySelector('.nav-menu-open'))).toBeDefined();
        await expect(page).toHaveScreenshot('menu-open.png');
		
        await page.getByTestId('header-menu-button').click();
        expect(await nav.locator('.nav-menu-open')).toBeHidden();
        await expect(page).toHaveScreenshot('menu-closed.png');
    });
});
 
