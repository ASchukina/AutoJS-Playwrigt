const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const { email, password, unknownEmail, unkwnownPassword } = require("../user.js");
// const { email } = require("../user.js");

test("Succesful authorisation", async ({ page }) => {
    
    await page.goto("https://netology.ru/?modal=sign_in");
    await page.fill('[placeholder="Email"]', email);
    await page.fill('[placeholder="Пароль"]', password);
    await page.click('[data-testid="login-submit-btn"]');

    await expect(page.locator("h2")).toContainText("Моё обучение");
});

test("Authorisation failed", async ({ page }) => {

    await page.goto("https://netology.ru/?modal=sign_in");
    await page.fill('[placeholder="Email"]', unknownEmail);
    await page.fill('[placeholder="Пароль"]', unkwnownPassword);
    await page.click('[data-testid="login-submit-btn"]');
    
    const error = await page.locator('[data-testid="login-error-hint"]');
    await expect(error).toHaveText("Вы ввели неправильно логин или пароль");
});