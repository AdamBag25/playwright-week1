import { test, expect } from '@playwright/test';               //

test.describe('TodoMVC', () => {                               //← NEW: open the folder

  test.beforeEach(async ({ page }) => {                        //← NEW: "before every test…"
    await page.goto('https://demo.playwright.dev/todomvc');    //   …open the site
  });                                                          //← NEW: end of beforeEach

  test('can add a to-do with variables', async ({ page }) => {
    const newTodo = page.getByPlaceholder('what needs to be done?');  //│ YOUR Day 5 test 1
    await newTodo.fill('buy milk');                            //│ (goto line removed)
    await newTodo.press('Enter');                              //│
    await expect(page.getByText('buy milk')).toBeVisible();    //│
  });                                                          //┘

  test('can add multiple to-dos', async ({ page }) => {      
    const newTodo = page.getByPlaceholder('what needs to be done?');  //│ YOUR Day 5 test 2
    await newTodo.fill('buy bread');                           //│ (goto line removed)
    await newTodo.press('Enter');                              //│
    await newTodo.fill('buy eggs');                            //│
    await newTodo.press('Enter');                              //│
    await expect(page.locator('.todo-list li')).toHaveCount(2);//│
  });
  test('double check for tick boxes', async ({page}) => {
    const newTodo = page.getByPlaceholder('what needs to be done?');
    await newTodo.fill('buy milk');
    await newTodo.press('Enter');
    await page.locator('.todo-list').getByRole('checkbox').check();
    await expect(page.locator('.todo-list').getByRole('checkbox')).toBeChecked();
    });                                                         //┘

});                                                           //← NEW: close the folder