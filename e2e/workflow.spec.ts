import { test, expect } from "@playwright/test";

test.describe("openIndu-studio Page", () => {
  test("should redirect /workflow to /motion-control/studio (page is public)", async ({ page }) => {
    await page.goto("/workflow");
    // /workflow redirects to the public studio path — no login required
    await expect(page).toHaveURL("/motion-control/studio");
  });

  test("should load studio page at /motion-control/studio", async ({ page }) => {
    await page.goto("/motion-control/studio");

    await expect(page).toHaveURL("/motion-control/studio");
    await expect(page.locator("h1")).toContainText("openIndu-studio 介绍");
  });

  test("should display all 6 workflow steps", async ({ page }) => {
    await page.goto("/motion-control/studio");

    const stepTitles = [
      "电气模组梳理",
      "电路图设计",
      "BOM 清单",
      "IO 地址规划",
      "PLC 编程",
      "HMI 编程",
    ];

    for (const title of stepTitles) {
      await expect(page.getByText(title, { exact: true })).toBeVisible();
    }
  });

  test("should show step badges 1-6", async ({ page }) => {
    await page.goto("/motion-control/studio");

    for (let i = 1; i <= 6; i++) {
      await expect(page.getByText(`步骤 ${i}`)).toBeVisible();
    }
  });

  test("should expand step description on click", async ({ page }) => {
    await page.goto("/motion-control/studio");

    // Click the first workflow step card
    const firstCard = page.getByText("电气模组梳理", { exact: true }).locator("..");
    await firstCard.click();

    // The description should now be visible in full
    await expect(page.getByText("根据设备清单与工艺需求拆分电气模组")).toBeVisible();
  });
});
