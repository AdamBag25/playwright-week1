import {test,expect} from '@playwright/test';

test ('can add a to-do', async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc');
     await page.getByPlaceholder('what needs to be done?').fill('buy milk');
     await page.getByPlaceholder('what needs to be done?').press('Enter');
                 
    await expect(page.getByText('buy milk')).toBeVisible();
})