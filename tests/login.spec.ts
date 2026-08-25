import { test, expect } from '@playwright/test';
import { LoginPage } from './LoginPage';

test('user can log in with valid details', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('tomsmith', 'SuperSecretPassword!');
  await expect(page.getByText('You logged into a secure area!')).toBeVisible();
});

test('shows an error with invalid details', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('wronguser', 'wrongpass');
  await expect(page.getByText('Your username is invalid!')).toBeVisible();
});