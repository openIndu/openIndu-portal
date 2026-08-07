import { defineConfig, devices } from "@playwright/test";

/**
 * Separate config for the prerender/SEO project — deliberately NOT merged
 * into playwright.config.ts's webServer array. Playwright starts every
 * entry in a `webServer` array unconditionally for any invocation of that
 * config, project filter or not; folding a production build in there
 * would make every routine `npx playwright test` run one. Run this one
 * separately (see e2e/prerender.spec.ts's header comment and
 * design/architecture/i18n-test-rework-plan.md section 4.3 — intended as
 * its own, slower CI job after the main suite).
 *
 * `npm run build` is a REQUIRED, SEPARATE step before this config, not
 * chained into webServer.command:
 *   npm run build && npx playwright test --config=playwright.prerender.config.ts
 *
 * Why not chain it (tried first, reverted): `npm run build`'s last step
 * (scripts/prerender.mjs) starts and stops its own internal preview
 * server on port 4173 to do the puppeteer rendering. Its stopServer()
 * fires `taskkill` without awaiting it (see that file's comment), so the
 * port isn't always released before the process tree Playwright is
 * watching reports done. Nesting that whole lifecycle inside the same
 * webServer.command Playwright supervises made the readiness check flake
 * unpredictably in this environment. Running the build first, outside
 * Playwright's process tree, sidesteps it — this webServer then only
 * has to start a plain `vite preview`, which is fast and has never
 * flaked here.
 *
 * URL uses `localhost`, not `127.0.0.1`: on at least one dev machine in
 * this project, `vite preview` (unlike `vite dev`) bound only the IPv6
 * loopback (`[::1]`), so the explicit IPv4 literal never connected. If
 * your shell has HTTP_PROXY/HTTPS_PROXY set, also export
 * NO_PROXY=localhost,127.0.0.1,::1 -- some proxies intercept loopback
 * traffic and return a 502 instead of connection-refused, which reads
 * exactly like "the server never started" while debugging this.
 */
export default defineConfig({
  testDir: "./e2e",
  testMatch: "prerender.spec.ts",
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: "http://localhost:4174",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "prerender",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    // Assumes `npm run build` already ran (see file header) -- just serves
    // the resulting dist/. Deliberately a different port from
    // prerender.mjs's own internal preview server (4173) to avoid any
    // chance of colliding with a not-yet-released one from the build step.
    command: "npm run preview:prerender-test",
    url: "http://localhost:4174",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
