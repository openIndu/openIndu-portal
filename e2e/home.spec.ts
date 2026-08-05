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

  test("should display new hero strategy messaging", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("非标自动化全链路工具链")).toBeVisible();
    await expect(page.getByText("OT/IT · 端侧 AI")).toBeVisible();
    await expect(page.getByText("工艺知识", { exact: true }).first()).toBeVisible();
  });

  test("should display three core products section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("三大核心产品")).toBeVisible();
    await expect(page.getByText("openIndu-studio").first()).toBeVisible();
    await expect(page.getByText("openIndu-platform").first()).toBeVisible();
    await expect(page.getByText("openindu-station").first()).toBeVisible();
  });

  test("should display strategic layers section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("上中下战略")).toBeVisible();
    await expect(page.getByText("向下扎根").first()).toBeVisible();
    await expect(page.getByText("中间深耕").first()).toBeVisible();
    await expect(page.getByText("向上突破").first()).toBeVisible();
  });

  test("should display studio workflow section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("openIndu-studio 开发工作流")).toBeVisible();
    await expect(page.getByText("电气模组梳理").first()).toBeVisible();
  });

  test("should display WeChat QR block", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("关注微信公众号")).toBeVisible();
    await expect(page.locator('img[alt="openIndu 微信公众号二维码"]')).toBeVisible();
  });

  test("should display navigation links in header", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("header nav");
    await expect(nav).toBeVisible();

    const links = ["首页", "资源中心", "AI+运动控制", "AI+视觉", "AI+工业互联网平台", "AI+基础设施"];
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
