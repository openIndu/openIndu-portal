import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should navigate from the Projects parent to the project map", async ({ page }) => {
    await page.goto("/");
    await page.locator("header").getByTestId("nav-products").click();
    await expect(page).toHaveURL("/architecture");
    await expect(page.locator("h1")).toContainText("openIndu 项目地图");
  });

  // Regression: "Projects" and "Architecture" share href "/architecture", so
  // both used to light up (and both got aria-current) on that page.
  test("only the owning header item is marked current", async ({ page }) => {
    await page.goto("/architecture");
    await expect(page.locator("header").getByTestId("nav-architecture")).toHaveAttribute("aria-current", "page");
    await expect(page.locator("header").getByTestId("nav-products")).not.toHaveAttribute("aria-current", "page");

    await page.goto("/vision");
    await expect(page.locator("header").getByTestId("nav-products")).toHaveAttribute("aria-current", "page");
    await expect(page.locator("header").getByTestId("nav-architecture")).not.toHaveAttribute("aria-current", "page");
  });

  test("should navigate from home to vision via header link", async ({ page }) => {
    await page.goto("/");

    await page.locator("header").getByTestId("nav-products").hover();
    const visionLink = page.locator("header").getByTestId("nav-vision");
    await visionLink.click();

    await expect(page).toHaveURL("/vision");
    await expect(page.locator("h1")).toContainText("AI+视觉");
  });

  test("should navigate from home to iiot platform via header link", async ({ page }) => {
    await page.goto("/");

    await page.locator("header").getByTestId("nav-products").hover();
    const platformLink = page.locator("header").getByTestId("nav-iiot-platform");
    await platformLink.click();

    await expect(page).toHaveURL("/iiot-platform");
    await expect(page.locator("h1")).toContainText("openIndu-platform 社区项目");
  });

  test("should navigate to openIndu-cim via the projects menu", async ({ page }) => {
    await page.goto("/");
    await page.locator("header").getByTestId("nav-products").hover();
    await page.locator("header").getByTestId("nav-edge-computing").click();
    await expect(page).toHaveURL("/edge-computing");
    await expect(page.locator("h1")).toContainText("openIndu-cim");
  });

  test("should navigate to login page from header", async ({ page }) => {
    await page.goto("/");

    const loginLink = page.locator("header").getByRole("link", { name: "登录" });
    await loginLink.click();

    await expect(page).toHaveURL("/login");
    await expect(page.getByRole("heading", { name: "手机号登录" })).toBeVisible();
  });

  test("should navigate back to home via logo click", async ({ page }) => {
    await page.goto("/motion-control");

    const logo = page.locator("header").getByText("openIndu").first();
    await logo.click();

    await expect(page).toHaveURL("/");
  });
});
