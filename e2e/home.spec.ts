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

  test("should display hero OS positioning", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("一栈贯通，开放智造")).toBeVisible();
    await expect(page.getByText("工业自动化的端到端开源操作系统")).toBeVisible();
    await expect(page.getByText("从工艺参数到产线数据，一个栈打通。任意品牌 PLC，全部开源。")).toBeVisible();
  });

  test("should display the five pain points", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("工控行业不缺工具，缺的是把工具连起来的东西")).toBeVisible();
    for (const stage of ["工艺知识", "工程生成", "跨品牌执行", "采集与数据", "分析洞察"]) {
      await expect(page.getByText(stage, { exact: true }).first()).toBeVisible();
    }
    await expect(page.getByText("没有一段连着下一段")).toBeVisible();
  });

  test("should display three core products section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("三大核心产品")).toBeVisible();
    await expect(page.getByText("openIndu-studio").first()).toBeVisible();
    await expect(page.getByText("openIndu-platform").first()).toBeVisible();
    await expect(page.getByText("openindu-station").first()).toBeVisible();
  });

  test("should display the five-node closed loop", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("五节点闭环")).toBeVisible();
    await expect(page.getByText("西门子 / 三菱 / 欧姆龙 / 基恩士 / 汇川")).toBeVisible();
    await expect(page.getByText("Apache PLC4X 协议层 · 时序库")).toBeVisible();
    await expect(page.getByText("闭环回流：")).toBeVisible();
  });

  test("should display studio workflow as the engineering node detail", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("工程生成节点 · 展开")).toBeVisible();
    await expect(page.getByText("openIndu-studio 六步工作流")).toBeVisible();
    await expect(page.getByText("电气模组梳理").first()).toBeVisible();
  });

  test("should display the value propositions", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("你拿到什么")).toBeVisible();
    await expect(page.getByText("跨品牌中立", { exact: true })).toBeVisible();
    await expect(page.getByText("数据主权", { exact: true })).toBeVisible();
    await expect(page.getByText("可验证", { exact: true })).toBeVisible();
  });

  test("should display WeChat QR block with search promotion style", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("搜一搜")).toBeVisible();
    await expect(page.getByText("微信扫码关注公众号")).toBeVisible();
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
