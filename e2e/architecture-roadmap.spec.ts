import { expect, test } from "@playwright/test";

const locales = [
  {
    path: "/architecture",
    heading: "openIndu 社区路线图",
    projects: "探索 openIndu 项目",
    stages: ["共建现场知识", "沉淀工程资产", "推动工具协同", "验证实际场景"],
    titles: ["论坛", "工业视觉", "工程资产", "设备互联与数据", "开放控制实验"],
    boundary: "非生产可用",
  },
  {
    path: "/en/architecture",
    heading: "openIndu Community Roadmap",
    projects: "Explore the openIndu Projects",
    stages: [
      "Share Field Knowledge",
      "Build Reusable Assets",
      "Connect Project Tools",
      "Validate Real Scenarios",
    ],
    titles: [
      "Forum",
      "Industrial Vision",
      "Engineering Assets",
      "Connectivity and Data",
      "Open Control Experiment",
    ],
    boundary: "Not production-ready",
  },
];

for (const locale of locales) {
  test(`${locale.path}: roadmap precedes all existing projects`, async ({ page }) => {
    await page.goto(locale.path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(locale.heading);
    const roadmap = page.locator('section[aria-labelledby="roadmap-heading"]');
    const projects = page.getByRole("region", { name: locale.projects });
    await expect(roadmap.getByRole("heading", { level: 3 })).toHaveText(locale.stages);
    await expect(projects.getByRole("heading", { level: 3 })).toHaveCount(5);
    for (const title of locale.titles) {
      await expect(
        projects.getByRole("heading", { level: 3 }).filter({ hasText: title }),
      ).toHaveCount(1);
    }
    await expect(projects).toContainText(locale.boundary);
    const roadmapBox = await roadmap.boundingBox();
    const projectsBox = await projects.boundingBox();
    expect(roadmapBox!.y + roadmapBox!.height).toBeLessThanOrEqual(projectsBox!.y);
    await expect(page.locator("main table tbody tr")).toHaveCount(5);
  });

  test(`${locale.path}: roadmap fits a mobile viewport`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(locale.path);
    const items = page.locator('section[aria-labelledby="roadmap-heading"] li');
    for (const item of await items.all()) {
      const box = await item.boundingBox();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(375);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      375,
    );
  });
}
