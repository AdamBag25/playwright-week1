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

    // add a to-do (fill + press), then...
    // check the checkbox
    // assert it's checked
  });

});