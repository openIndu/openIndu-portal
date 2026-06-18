import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test("should load the login page", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveTitle(/openIndu/);
    await expect(page.getByRole("heading", { name: "手机号登录" })).toBeVisible();
  });

  test("should display phone input field", async ({ page }) => {
    await page.goto("/login");
    const phoneInput = page.locator("#login-phone");
    await expect(phoneInput).toBeVisible();
    await expect(phoneInput).toHaveAttribute("placeholder", "请输入 11 位手机号");
  });

  test("should display code input and send button", async ({ page }) => {
    await page.goto("/login");
    const codeInput = page.locator("#login-code");
    await expect(codeInput).toBeVisible();

    const sendButton = page.getByRole("button", { name: "发送验证码" });
    await expect(sendButton).toBeVisible();
  });

  test("should have submit button disabled when inputs are empty", async ({ page }) => {
    await page.goto("/login");
    const submitButton = page.getByRole("button", { name: "登录" });
    await expect(submitButton).toBeDisabled();
  });

  test("should enable submit when valid phone and code are entered", async ({ page }) => {
    await page.goto("/login");
    await page.fill("#login-phone", "13800138000");
    await page.fill("#login-code", "123456");

    const submitButton = page.getByRole("button", { name: "登录" });
    await expect(submitButton).toBeEnabled();
  });

  test("should have link to register page", async ({ page }) => {
    await page.goto("/login");
    const registerLink = page.getByRole("link", { name: "立即注册" });
    await expect(registerLink).toBeVisible();
    await expect(registerLink).toHaveAttribute("href", "/register");
  });

  test("should show error for invalid phone format", async ({ page }) => {
    await page.goto("/login");
    await page.fill("#login-phone", "123");

    const sendButton = page.getByRole("button", { name: "发送验证码" });
    // Button should still be clickable — clicking triggers validation
    await sendButton.click();

    const error = page.locator(".text-red-700");
    await expect(error).toBeVisible();
    await expect(error).toContainText("11 位");
  });
});
