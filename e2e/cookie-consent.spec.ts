import { expect, test } from "@playwright/test";

const consentKey = "openindu_cookie_consent";

test.beforeEach(async ({ page }) => {
  await page.addInitScript((key) => localStorage.removeItem(key), consentKey);
});

test("reject blocks page-view analytics and persists", async ({ page }) => {
  let tracks = 0;
  await page.route("**/api/v1/visits/track", async (route) => {
    tracks += 1;
    await route.fulfill({ json: { code: 0, data: { tracked: true } } });
  });

  await page.goto("/");
  await expect(page.getByTestId("cookie-consent-banner")).toBeVisible();
  expect(tracks).toBe(0);
  await page.getByTestId("cookie-reject").click();
  await page.getByTestId("nav-architecture").click();
  await page.waitForTimeout(200);
  expect(tracks).toBe(0);
  expect(
    await page.evaluate(
      (key) => JSON.parse(localStorage.getItem(key) ?? "null").analytics,
      consentKey,
    ),
  ).toBe(false);
});

test("accept enables page-view analytics once for the current route", async ({ page }) => {
  let tracks = 0;
  await page.route("**/api/v1/visits/track", async (route) => {
    tracks += 1;
    await route.fulfill({ json: { code: 0, data: { tracked: true } } });
  });

  await page.goto("/");
  expect(tracks).toBe(0);
  await page.getByTestId("cookie-accept").click();
  await expect.poll(() => tracks).toBe(1);
  await expect(page.getByTestId("cookie-consent-banner")).toBeHidden();
});

test("manager saves preferences and footer reopens them", async ({ page }) => {
  await page.route("**/api/v1/visits/track", (route) =>
    route.fulfill({ json: { code: 0, data: { tracked: true } } }),
  );
  await page.goto("/");
  await page.getByTestId("cookie-manage").click();
  await expect(page.getByTestId("cookie-settings-dialog")).toBeVisible();
  await expect(page.getByLabel(/Necessary|必要存储/)).toBeDisabled();
  await page.getByTestId("cookie-analytics").check();
  await page.getByTestId("cookie-save").click();
  await page.getByTestId("cookie-settings").scrollIntoViewIfNeeded();
  await page.getByTestId("cookie-settings").click();
  await expect(page.getByTestId("cookie-analytics")).toBeChecked();
});

test("English route renders English privacy controls", async ({ page }) => {
  await page.goto("/en/");
  await expect(
    page.getByRole("heading", { name: "openIndu Community Respects Your Privacy" }),
  ).toBeVisible();
  await expect(page.getByTestId("cookie-accept")).toHaveText("Accept All");
  await expect(page.getByTestId("cookie-consent-banner")).toContainText(
    "By selecting Reject All, analytics remains disabled.",
  );
  await expect(page.getByTestId("cookie-consent-banner").getByRole("link")).toHaveAttribute(
    "href",
    "/en/cookies",
  );
  await expect(page.getByTestId("cookie-actions").getByRole("button")).toHaveText([
    "Accept All",
    "Reject All",
    "Manage Cookies",
  ]);
});
