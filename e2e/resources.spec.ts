import { test, expect } from "@playwright/test";

test.describe("Resources Page", () => {
  test("should load resources page without login", async ({ page }) => {
    await page.goto("/resources");
    // Page is public — should NOT redirect to login
    await expect(page).toHaveURL("/resources");
    await expect(page.getByText("文档与软件下载")).toBeVisible();
  });

  test("should have document and software tabs visible when authenticated", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("openindu_portal_token", "test-token");
      localStorage.setItem("openindu_portal_user", JSON.stringify({ id: 1, phone: "13800138000", role: "member" }));
    });
    await page.goto("/resources");

    await expect(page.getByText("文档")).toBeVisible();
    await expect(page.getByText("软件")).toBeVisible();
  });

  test("should display search and filter controls when authenticated", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("openindu_portal_token", "test-token");
      localStorage.setItem("openindu_portal_user", JSON.stringify({ id: 1, phone: "13800138000", role: "member" }));
    });
    await page.goto("/resources");

    const searchInput = page.getByPlaceholder("输入关键词搜索资源");
    await expect(searchInput).toBeVisible();

    const searchButton = page.getByRole("button", { name: "搜索" });
    await expect(searchButton).toBeVisible();
  });
});
