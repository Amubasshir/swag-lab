const { test, expect } = require('@playwright/test');

test.describe('Swag Labs Test', () => {
  test('Valid Login and Product Add', async ({ page }) => {
    // Login
    await page.goto('https://www.saucedemo.com/');
    await page.pause();
    await page.fill('[placeholder="Username"]', 'standard_user');
    await page.fill('[placeholder="Password"]', 'secret_sauce');
    await page.click('[type="submit"]');
    await expect(page).toHaveTitle('Swag Labs');

    // Product Add
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_badge');
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'mubasshir');
    await page.fill('[data-test="lastName"]', 'ahmed');
    await page.fill('[data-test="postalCode"]', '2210');
    await page.click('[data-test="continue"]');

    await page.waitForSelector(
      '.summary_info_label:has-text("Payment Information")'
    );

    // Verify order placement
    await page.click('[data-test="finish"]');
    const orderConfirmationMessage = await page.waitForSelector(
      '.complete-header'
    );
    const messageText = await orderConfirmationMessage.textContent();
    expect(messageText.toLowerCase()).toContain('thank you for your order');
  });
});
