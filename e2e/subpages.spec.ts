import { test, expect } from "@playwright/test";

test.describe("Motion Control Page", () => {
  test("should load the motion control page", async ({ page }) => {
    await page.goto("/motion-control");
    await expect(page.locator("h1")).toContainText("AI+运动控制");
  });

  test("should display 'coming soon' badge", async ({ page }) => {
    await page.goto("/motion-control");
    await expect(page.getByText("敬请期待", { exact: true }).first()).toBeVisible();
  });

  test("should display PLC brand cards", async ({ page }) => {
    await page.goto("/motion-control");
    await expect(page.getByText("三菱PLC")).toBeVisible();
    await expect(page.getByText("西门子PLC")).toBeVisible();
  });
});

test.describe("Vision Page", () => {
  test("should load the vision page", async ({ page }) => {
    await page.goto("/vision");
    await expect(page.locator("h1")).toContainText("AI+视觉");
  });

  test("should display 'coming soon' badge", async ({ page }) => {
    await page.goto("/vision");
    await expect(page.getByText("敬请期待", { exact: true }).first()).toBeVisible();
  });
});

test.describe("IIoT Platform Page", () => {
  test("should load the iiot platform page", async ({ page }) => {
    await page.goto("/iiot-platform");
    await expect(page.locator("h1")).toContainText("工业互联网平台");
  });

  test("should display architecture section", async ({ page }) => {
    await page.goto("/iiot-platform");
    await expect(page.getByText("技术架构")).toBeVisible();
  });
});

test.describe("Infrastructure Page", () => {
  test("should load the infrastructure page", async ({ page }) => {
    await page.goto("/infrastructure");
    await expect(page.locator("h1")).toContainText("AI+基础设施");
  });

  test("should display status badge", async ({ page }) => {
    await page.goto("/infrastructure");
    await expect(page.getByText("已上线")).toBeVisible();
  });

  test("should have access link to model platform", async ({ page }) => {
    await page.goto("/infrastructure");
    const link = page.getByRole("link", { name: "访问模型平台" });
    await expect(link).toBeVisible();
  });
});
