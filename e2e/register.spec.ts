import { test, expect } from "@playwright/test";

// Register is no longer a standalone page -- routes.tsx redirects /register
// to /login (the login page handles first-time sign-up automatically).
// This file previously asserted a #register-phone form and a "注册并登录"
// button that have not existed for some time; replaced with a redirect check.

const LOCALES = [
  { locale: "zh" as const, prefix: "", label: "Chinese" },
  { locale: "en" as const, prefix: "/en", label: "English" },
] as const;

for (const { prefix, label } of LOCALES) {
  test.describe(`Register redirect (${label})`, () => {
    test("should redirect /register to /login", async ({ page }) => {
      await page.goto(prefix + "/register");
      await expect(page).toHaveURL(prefix + "/login");
    });
  });
}
