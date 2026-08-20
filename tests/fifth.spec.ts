import { test, expect } from '@playwright/test';

test('can add two to-do items', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');   // open the page

  const newTodo = page.getByPlaceholder('What needs to be done?');  // save the input's nickname

  await newTodo.fill('Buy milk');        // type the first to-do
  await newTodo.press('Enter');          // submit it

  await newTodo.fill('Walk the dog');    // reuse the SAME nickname for the second
  await newTodo.press('Enter');          // submit it

  await expect(page.getByText('Buy milk')).toBeVisible();        // first one showing?
  await expect(page.getByText('Walk the dog')).toBeVisible();   // second one showing?
  await expect(page.locator('.todo-list li')).toHaveCount(2);      // exactly 2 items in the list?
});