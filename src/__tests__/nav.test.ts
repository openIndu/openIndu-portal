import { describe, it, expect } from "vitest";
import { isNavItemActive } from "@/app/utils/nav";

// Mirrors the real header items in Layout.tsx.
const HOME = { href: "/" };
const ARCHITECTURE = { href: "/architecture" };
const PRODUCTS = {
  href: "/architecture",
  match: ["/motion-control", "/vision", "/iiot-platform", "/edge-computing"],
};
const RESOURCES = { href: "/resources" };

describe("isNavItemActive", () => {
  it("home is active only on the exact root", () => {
    expect(isNavItemActive(HOME, "/")).toBe(true);
    expect(isNavItemActive(HOME, "/architecture")).toBe(false);
  });

  it("a plain item matches its path and nested paths, segment-aware", () => {
    expect(isNavItemActive(RESOURCES, "/resources")).toBe(true);
    expect(isNavItemActive(RESOURCES, "/resources/software")).toBe(true);
    expect(isNavItemActive(RESOURCES, "/resources-archive")).toBe(false);
  });

  // The bug: "Projects" and "Architecture" share href "/architecture".
  it("on /architecture, only Architecture is active — not Projects", () => {
    expect(isNavItemActive(ARCHITECTURE, "/architecture")).toBe(true);
    expect(isNavItemActive(PRODUCTS, "/architecture")).toBe(false);
  });

  // The inverse bug: Projects never lit up on its own child pages.
  it("on a project page, Projects is active — not Architecture", () => {
    for (const path of ["/vision", "/vision/station", "/motion-control/studio", "/iiot-platform", "/edge-computing"]) {
      expect(isNavItemActive(PRODUCTS, path)).toBe(true);
      expect(isNavItemActive(ARCHITECTURE, path)).toBe(false);
    }
  });

  it("exactly one of the two ever matches, across every header route", () => {
    const routes = [
      "/", "/architecture", "/use-cases", "/craftsmanship", "/forum", "/resources",
      "/motion-control", "/motion-control/studio", "/vision", "/vision/station",
      "/iiot-platform", "/edge-computing", "/chat",
    ];
    for (const path of routes) {
      const both = [ARCHITECTURE, PRODUCTS].filter((i) => isNavItemActive(i, path));
      expect(both.length).toBeLessThanOrEqual(1);
    }
  });
});
