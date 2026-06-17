import { test, expect } from "@playwright/test";

test.describe("Workflow Page", () => {
  test("should redirect to login when not authenticated", async ({ page }) => {
    await page.goto("/workflow");
    await expect(page).toHaveURL(/\/login/);
  });

  test("should load workflow page when authenticated as member", async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem("openindu_portal_token", "test-token");
      localStorage.setItem("openindu_portal_user", JSON.stringify({ id: 1, phone: "13800138000", role: "member" }));
    });
    await page.goto("/workflow");

    await expect(page.locator("h1")).toContainText("PLC 开发六步工作流");
  });

  test("should display all 6 workflow steps", async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem("openindu_portal_token", "test-token");
      localStorage.setItem("openindu_portal_user", JSON.stringify({ id: 1, phone: "13800138000", role: "member" }));
    });
    await page.goto("/workflow");

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
    await page.evaluate(() => {
      localStorage.setItem("openindu_portal_token", "test-token");
      localStorage.setItem("openindu_portal_user", JSON.stringify({ id: 1, phone: "13800138000", role: "member" }));
    });
    await page.goto("/workflow");

    for (let i = 1; i <= 6; i++) {
      await expect(page.getByText(`步骤 ${i}`)).toBeVisible();
    }
  });

  test("should expand step description on click", async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem("openindu_portal_token", "test-token");
      localStorage.setItem("openindu_portal_user", JSON.stringify({ id: 1, phone: "13800138000", role: "member" }));
    });
    await page.goto("/workflow");

    // Click the first workflow step card
    const firstCard = page.getByText("电气模组梳理", { exact: true }).locator("..");
    await firstCard.click();

    // The description should now be visible in full
    await expect(page.getByText("根据设备清单与工艺需求拆分电气模组")).toBeVisible();
  });
});
