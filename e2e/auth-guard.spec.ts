import { test, expect } from "@playwright/test";

test.describe("Auth Guard", () => {
  test("should load /resources without login (page is now public)", async ({ page }) => {
    await page.goto("/resources");
    // Resources is publicly accessible; no redirect to login
    await expect(page).toHaveURL("/resources");
    await expect(page.getByText("文档与软件下载")).toBeVisible();
  });

  test("should redirect /workflow to /motion-control/studio", async ({ page }) => {
    await page.goto("/workflow");
    // Old /workflow route redirects to the new public path
    await expect(page).toHaveURL("/motion-control/studio");
  });

  test("should show resources page when authenticated as member", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("openindu_portal_token", "test-token");
      localStorage.setItem("openindu_portal_user", JSON.stringify({ id: 1, phone: "13800138000", role: "member" }));
    });
    await page.goto("/resources");

    // Should stay on resources (not redirect to login)
    await expect(page).toHaveURL("/resources");
    await expect(page.locator("h1")).toContainText("文档与软件下载");
  });

  test("should show openIndu-studio page when navigating /workflow", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("openindu_portal_token", "test-token");
      localStorage.setItem("openindu_portal_user", JSON.stringify({ id: 1, phone: "13800138000", role: "member" }));
    });
    await page.goto("/workflow");

    // /workflow redirects to /motion-control/studio
    await expect(page).toHaveURL("/motion-control/studio");
    await expect(page.locator("h1")).toContainText("openIndu-studio 介绍");
  });
});
