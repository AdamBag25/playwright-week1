import{test,expect} from '@playwright/test';

test('can add a to-do item', async ({page}) => {
  await page.goto('https://demo.playwright.dev/todomvc');  
  await page.getByPlaceholder('What needs to be done?').fill('Buy milk');
  await page.getByPlaceholder('What needs to be done?').press('Enter');
  await expect(page.getByText('Buy milk')).toBeVisible();
});