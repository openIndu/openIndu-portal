import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should load the home page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/openIndu/);
  });

  test("should display hero section with heading", async ({ page }) => {
    await page.goto("/");
    const heading = page.locator("h1");
    await expect(heading.first()).toBeVisible();
  });

  test("should display navigation links in header", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("header nav");
    await expect(nav).toBeVisible();

    const links = ["首页", "资源中心", "工作流", "AI+运动控制", "AI+视觉", "AI+工业互联网平台", "AI+基础设施"];
    for (const link of links) {
      await expect(page.locator("header").getByText(link, { exact: true }).first()).toBeVisible();
    }
  });

  test("should display footer with copyright", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(footer).toContainText("openIndu Community");
  });
});
