import { test, expect } from "@playwright/test";

test.describe("Runtime regression", () => {
  test("home page renders when portal APIs use wrapped items responses", async ({ page }) => {
    await page.route("**/api/v1/portal/hero", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ code: 200, data: { section: "hero", content: {} } }),
      });
    });
    await page.route("**/api/v1/portal/solutions", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ code: 200, data: { items: [] } }),
      });
    });
    await page.route("**/api/v1/portal/carousel", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ code: 200, data: { items: [] } }),
      });
    });

    const pageErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.goto("/");

    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "核心解决方案" })).toBeVisible();
    expect(pageErrors).toEqual([]);
  });
});
