import { test, expect } from "@playwright/test";

test("click get started on the homepage", async ({page}) =>{
    await page.goto('https://playwright.dev/');
    await page.getByRole('link', {name: 'Get started'}).click();
    await expect(page.getByRole('heading', {name: 'Installation'})).toBeVisible();
});