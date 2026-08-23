import { test, expect } from '@playwright/test';

test.describe('TodoMVC', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
  });

  test('can add a single to-do', async ({ page }) => {
    const newTodo = page.getByPlaceholder('What needs to be done?');
    await newTodo.fill('Buy milk');
    await newTodo.press('Enter');
    await expect(page.getByText('Buy milk')).toBeVisible();
    // TODO: add one to-do ('Buy milk') and assert it's visible
    // (no goto needed — beforeEach already did it!)
  });

  test('can add two to-dos', async ({ page }) => {
    const newTodo = page.getByPlaceholder('What needs to be done?');
    await newTodo.fill('Buy milk');
    await newTodo.press('Enter');
    await newTodo.fill('Walk the dog');
    await newTodo.press('Enter');
    await expect(page.locator('.todo-list li')).toHaveCount(2);
    // TODO: add two to-dos, then assert the list count is 2
  });
    test('can mark a to-do as complete', async ({ page }) => {
    const newTodo = page.getByPlaceholder('What needs to be done?');
    await newTodo.fill('buy milk');
    await newTodo.press('Enter');
     await page.locator('.todo-list').getByRole('checkbox').check();
    await expect(page.locator('.todo-list').getByRole('checkbox')).toBeChecked();
  });
    test('completed to-dos are hidden under the Active filter', async ({ page }) => {
    const newTodo = page.getByPlaceholder('What needs to be done?');   // 1. the input (Day 5)
    await newTodo.fill('Buy milk');                                    // 2. type it (Day 4)
    await newTodo.press('Enter');                                      // 3. add it (Day 4)
    await page.locator('.todo-list').getByRole('checkbox').check();    // 4. tick it done (Day 8)
    await page.getByRole('link', { name: 'Active' }).click();          // 5. click Active filter (Day 3)
    await expect(page.getByText('Buy milk')).not.toBeVisible();        // 6. it's gone → green
  });
   test('can complete a specific to-do', async ({ page}) => {
    const newTodo = page.getByPlaceholder('What needs to be done?');
    await newTodo.fill('Buy milk');
    await newTodo.press('Enter');
    await newTodo.fill('Walk the dog');
    await newTodo.press('Enter');
    await page.locator('.todo-list li').filter({ hasText: 'Walk the dog' }).getByRole('checkbox').check();
    await expect(page.locator('.todo-list li').filter({ hasText: 'Walk the dog' }).getByRole('checkbox')).toBeChecked();
   });
});