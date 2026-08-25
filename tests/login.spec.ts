import { test, expect } from '@playwright/test';

test('user can log in with valid details', async ({ page }) => {
await page.goto('https://the-internet.herokuapp.com/login');
await page.getByLabel('username').fill('tomsmith');
await page.getByLabel('password').fill('SuperSecretPassword!');
await page.getByRole('button', { name: 'Login' }).click();
await expect(page.getByText('you logged into a secure area!')).toBeVisible();


  // goto the login page
  // fill Username (getByLabel)
  // fill Password (getByLabel)
  // click the Login button
  // assert the success message is visible
});