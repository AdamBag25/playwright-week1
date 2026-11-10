import {test, expect} from "@playwright/test";
test("homepage says welcome", async ( {page} ) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await expect(page.getByRole("heading", {name: 'Welcome to the-internet'})).toBeVisible();
});