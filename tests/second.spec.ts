import{test,expect} from '@playwright/test';

test ('example page shows its heading', async ({page}) => {
    await page.goto('https://example.com') ;
    page.getByRole('heading', {name:'Example Domain'} )
   await expect(page.getByRole('heading', { name: 'Example Domain' })).toBeVisible();
 });