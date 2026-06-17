import { test, expect } from "@playwright/test";

test.describe("Register Page", () => {
  test("should load the register page", async ({ page }) => {
    await page.goto("/register");
    await expect(page).toHaveTitle(/openIndu/);
    await expect(page.locator("h2")).toContainText("注册 openIndu 账号");
  });

  test("should display phone input field", async ({ page }) => {
    await page.goto("/register");
    const phoneInput = page.locator("#register-phone");
    await expect(phoneInput).toBeVisible();
    await expect(phoneInput).toHaveAttribute("placeholder", "请输入 11 位手机号");
  });

  test("should display code input and send button", async ({ page }) => {
    await page.goto("/register");
    const codeInput = page.locator("#register-code");
    await expect(codeInput).toBeVisible();

    const sendButton = page.getByRole("button", { name: "发送验证码" });
    await expect(sendButton).toBeVisible();
  });

  test("should have submit button disabled when inputs are empty", async ({ page }) => {
    await page.goto("/register");
    const submitButton = page.getByRole("button", { name: "注册并登录" });
    await expect(submitButton).toBeDisabled();
  });

  test("should enable submit when valid phone and code are entered", async ({ page }) => {
    await page.goto("/register");
    await page.fill("#register-phone", "13800138000");
    await page.fill("#register-code", "123456");

    const submitButton = page.getByRole("button", { name: "注册并登录" });
    await expect(submitButton).toBeEnabled();
  });

  test("should have link to login page", async ({ page }) => {
    await page.goto("/register");
    const loginLink = page.getByRole("link", { name: "返回登录" });
    await expect(loginLink).toBeVisible();
    await expect(loginLink).toHaveAttribute("href", "/login");
  });
});
