import { test, expect } from "@playwright/test";

test.describe("Account Settings", () => {
  test("should show personal center with masked phone after login", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("openindu_portal_token", "test-token");
      localStorage.setItem("openindu_portal_user", JSON.stringify({ id: 1, phone: "13800138000", nickname: "Tom", role: "member" }));
    });
    await page.goto("/");

    await expect(page.locator("header").getByRole("link", { name: /Tom/ })).toBeVisible();
    await page.locator("header").getByRole("link", { name: /Tom/ }).click();

    await expect(page).toHaveURL("/account");
    await expect(page.getByRole("heading", { name: "账号设置" })).toBeVisible();
    await expect(page.getByText("138****8000")).toBeVisible();
    await expect(page.getByText("13800138000")).toHaveCount(0);
  });
});
