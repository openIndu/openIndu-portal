import { test, expect } from "@playwright/test";

test.describe("Portal login regression", () => {
  test("stores token and redirects after login", async ({ page }) => {
    await page.goto("/login");
    await page.fill("#login-phone", "13800000000");
    await page.fill("#login-code", "888888");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/resources/);
    await page.waitForLoadState("networkidle");

    const token = await page.evaluate(() => localStorage.getItem("openindu_portal_token"));
    expect(token).toBeTruthy();
  });
});
