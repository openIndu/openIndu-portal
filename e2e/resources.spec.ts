import { test, expect } from "@playwright/test";

test.describe("Resources Page", () => {
  test("should redirect to login when not authenticated", async ({ page }) => {
    await page.goto("/resources");
    // Should redirect to login since resources is protected
    await expect(page).toHaveURL(/\/login/);
  });

  test("should have document and software tabs visible when authenticated", async ({ page }) => {
    // Set auth token to bypass AuthGuard
    await page.evaluate(() => {
      localStorage.setItem("openindu_portal_token", "test-token");
      localStorage.setItem("openindu_portal_user", JSON.stringify({ id: 1, phone: "13800138000", role: "member" }));
    });
    await page.goto("/resources");

    // Verify tabs are visible
    await expect(page.getByText("文档")).toBeVisible();
    await expect(page.getByText("软件")).toBeVisible();
  });

  test("should display search and filter controls when authenticated", async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem("openindu_portal_token", "test-token");
      localStorage.setItem("openindu_portal_user", JSON.stringify({ id: 1, phone: "13800138000", role: "member" }));
    });
    await page.goto("/resources");

    // Search input should be visible
    const searchInput = page.getByPlaceholder("输入关键词搜索资源");
    await expect(searchInput).toBeVisible();

    // Search button should be visible
    const searchButton = page.getByRole("button", { name: "搜索" });
    await expect(searchButton).toBeVisible();
  });
});
