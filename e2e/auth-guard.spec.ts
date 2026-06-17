import { test, expect } from "@playwright/test";

test.describe("Auth Guard", () => {
  test("should redirect /resources to /login when not authenticated", async ({ page }) => {
    await page.goto("/resources");
    await expect(page).toHaveURL(/\/login/);
    // Login URL should contain redirect param
    const url = new URL(page.url());
    expect(url.searchParams.get("redirect")).toBe("/resources");
  });

  test("should redirect /workflow to /login when not authenticated", async ({ page }) => {
    await page.goto("/workflow");
    await expect(page).toHaveURL(/\/login/);
    const url = new URL(page.url());
    expect(url.searchParams.get("redirect")).toBe("/workflow");
  });

  test("should show resources page when authenticated as member", async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem("openindu_portal_token", "test-token");
      localStorage.setItem("openindu_portal_user", JSON.stringify({ id: 1, phone: "13800138000", role: "member" }));
    });
    await page.goto("/resources");

    // Should stay on resources (not redirect to login)
    await expect(page).toHaveURL("/resources");
    await expect(page.getByText("成员资源中心")).toBeVisible();
  });

  test("should show workflow page when authenticated as member", async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem("openindu_portal_token", "test-token");
      localStorage.setItem("openindu_portal_user", JSON.stringify({ id: 1, phone: "13800138000", role: "member" }));
    });
    await page.goto("/workflow");

    // Should stay on workflow (not redirect to login)
    await expect(page).toHaveURL("/workflow");
    await expect(page.locator("h1")).toContainText("PLC 开发六步工作流");
  });
});
