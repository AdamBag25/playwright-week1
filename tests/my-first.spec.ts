import{test,expect} from '@playwright/test';

test ('homepage has the right title' , async ({page}) => {
    await page.goto('https://playwright.dev') ;
await expect(page).toHaveTitle(/Playwright/)
} );
