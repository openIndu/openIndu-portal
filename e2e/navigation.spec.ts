import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should navigate from home to motion control via header link", async ({ page }) => {
    await page.goto("/");

    const motionLink = page.locator("header").getByText("AI+运动控制", { exact: true }).first();
    await motionLink.click();

    await expect(page).toHaveURL("/motion-control");
    await expect(page.locator("h1")).toContainText("AI+运动控制");
  });

  test("should navigate from home to vision via header link", async ({ page }) => {
    await page.goto("/");

    const visionLink = page.locator("header").getByText("AI+视觉", { exact: true }).first();
    await visionLink.click();

    await expect(page).toHaveURL("/vision");
    await expect(page.locator("h1")).toContainText("AI+视觉");
  });

  test("should navigate from home to iiot platform via header link", async ({ page }) => {
    await page.goto("/");

    const platformLink = page.locator("header").getByText("AI+工业互联网平台", { exact: true }).first();
    await platformLink.click();

    await expect(page).toHaveURL("/iiot-platform");
    await expect(page.locator("h1")).toContainText("工业互联网平台");
  });

  test("should navigate from home to infrastructure via header link", async ({ page }) => {
    await page.goto("/");

    const infraLink = page.locator("header").getByText("AI+基础设施", { exact: true }).first();
    await infraLink.click();

    await expect(page).toHaveURL("/infrastructure");
    await expect(page.locator("h1")).toContainText("AI+基础设施");
  });

  test("should navigate to login page from header", async ({ page }) => {
    await page.goto("/");

    const loginLink = page.locator("header").getByRole("link", { name: "登录" });
    await loginLink.click();

    await expect(page).toHaveURL("/login");
    await expect(page.getByRole("heading", { name: "手机号登录" })).toBeVisible();
  });

  test("should navigate to register page from header", async ({ page }) => {
    await page.goto("/");

    const registerLink = page.locator("header").getByRole("link", { name: "注册" });
    await registerLink.click();

    await expect(page).toHaveURL("/register");
    await expect(page.getByRole("heading", { name: "注册 openIndu 社区账号" })).toBeVisible();
  });

  test("should navigate back to home via logo click", async ({ page }) => {
    await page.goto("/motion-control");

    const logo = page.locator("header").getByText("openIndu").first();
    await logo.click();

    await expect(page).toHaveURL("/");
  });
});
