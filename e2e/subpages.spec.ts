import { test, expect } from "@playwright/test";

// Motion Control is translated (PR-3); Vision/IIoT/Infrastructure below are
// still ZH-only pending PR-4, so only this block is locale-parameterized.
const MOTION_CONTROL_GOLDEN = {
  h1: { zh: "AI+运动控制", en: "AI + Motion Control" },
  launchedBadge: { zh: "正式推出", en: "Generally Available" },
  comingSoonBadge: { zh: "敬请期待", en: "Coming soon" },
  mitsubishi: { zh: "三菱PLC", en: "Mitsubishi PLC" },
  siemens: { zh: "西门子PLC", en: "Siemens PLC" },
} as const;

const LOCALES = [
  { locale: "zh" as const, prefix: "", label: "Chinese" },
  { locale: "en" as const, prefix: "/en", label: "English" },
] as const;

for (const { locale, prefix, label } of LOCALES) {
  test.describe(`Motion Control Page (${label})`, () => {
    test("should load the motion control page", async ({ page }) => {
      await page.goto(prefix + "/motion-control");
      await expect(page.locator("h1")).toContainText(MOTION_CONTROL_GOLDEN.h1[locale]);
    });

    test("should display launched badge", async ({ page }) => {
      await page.goto(prefix + "/motion-control");
      await expect(page.getByText(MOTION_CONTROL_GOLDEN.launchedBadge[locale], { exact: true }).first()).toBeVisible();
      await expect(page.getByText(MOTION_CONTROL_GOLDEN.comingSoonBadge[locale], { exact: true })).toHaveCount(0);
    });

    test("should display PLC brand cards", async ({ page }) => {
      await page.goto(prefix + "/motion-control");
      await expect(page.getByText(MOTION_CONTROL_GOLDEN.mitsubishi[locale])).toBeVisible();
      await expect(page.getByText(MOTION_CONTROL_GOLDEN.siemens[locale])).toBeVisible();
    });
  });
}

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

  test("should not display WeChat QR block (moved to home)", async ({ page }) => {
    await page.goto("/iiot-platform");
    await expect(page.getByText("关注微信公众号")).toHaveCount(0);
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
