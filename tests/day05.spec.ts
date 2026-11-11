import {test,expect} from '@playwright/test';

test ('can add a to-do with variables', async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    const newTodo = page.getByPlaceholder('what needs to be done?');
    await newTodo.fill('buy milk');
    await newTodo.press('Enter');
                 
    await expect(page.getByText('buy milk')).toBeVisible();
});

test('can add multiple to-dos', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  const newTodo = page.getByPlaceholder('what needs to be done?');
  await newTodo.fill('buy bread');
  await newTodo.press('Enter');
  await newTodo.fill('buy eggs');
  await newTodo.press('Enter');
  await expect(page.locator('.todo-list li')).toHaveCount(2);
});