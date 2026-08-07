import { test, expect } from "@playwright/test";

// ─── Golden-value table ───
// Curated manually against src/locales/{zh,en}/home.json and
// docs/i18n-glossary.md. NOT read from locale JSON at test time --
// that would make the test tautological (see design/architecture/
// i18n-test-rework-plan.md section 1.1).

const GOLDEN = {
  heroTitleLine1: {
    zh: "一栈贯通，开放智造",
    en: "One Stack, End to End — Open Manufacturing",
  },
  heroTitleLine2: {
    zh: "工业自动化的端到端开源操作系统",
    en: "The End-to-End Open-Source OS for Industrial Automation",
  },
  heroSubtitle: {
    zh: "从工艺参数到产线数据，一个栈打通。任意品牌 PLC，全部开源。",
    en: "From process parameters to line data — one stack, end to end. Any brand PLC, fully open source.",
  },
  productsHeading: { zh: "三大核心产品", en: "Three Core Projects" },
  nodesHeading: { zh: "五大节点闭环", en: "The Five-Stage Closed Loop" },
  nodesSubheading: {
    zh: "工艺约束 → 生成 → 执行 → 数据 → 洞察 → 回到工艺约束",
    en: "Process constraints → Generation → Execution → Data → Insight → back to process constraints",
  },
  nodeTitles: {
    zh: ["工艺知识", "工程生成", "跨品牌执行", "采集与数据", "分析洞察"],
    en: [
      "Process Knowledge",
      "Engineering Generation",
      "Cross-Brand Execution",
      "Acquisition & Data",
      "Analytics & Insight",
    ],
  },
  nodeCrossBrandDuty: {
    zh: "西门子 / 三菱 / 欧姆龙 / 基恩士 / 汇川",
    en: "Siemens / Mitsubishi / Omron / Keyence / Inovance",
  },
  nodeDataDuty: {
    zh: "Apache PLC4X 协议层 · 时序库",
    en: "Apache PLC4X protocol layer · Time-series database",
  },
  openSourceHeading: {
    zh: "开源、开放标准、开放协作",
    en: "Open Source, Open Standards, Open Collaboration",
  },
  openSourceCtaHeading: { zh: "查看代码，参与贡献", en: "View the Code, Contribute" },
  openSourceCtaSubheading: {
    zh: "全部仓库公开，Apache-2.0 授权",
    en: "All repositories public, Apache-2.0 licensed",
  },
  protocolsTitle: {
    zh: "开箱即用的协议支持",
    en: "Protocol Support, Out of the Box",
  },
  ctaHeading: { zh: "加入 openIndu 社区", en: "Join the openIndu Community" },
  wechatHeading: { zh: "微信扫码关注公众号", en: "Follow us on WeChat" },
  wechatAlt: { zh: "openIndu 微信公众号二维码", en: "openIndu WeChat QR code" },
} as const;

type GoldenKey = keyof typeof GOLDEN;

function gv(key: GoldenKey, locale: "zh" | "en") {
  return GOLDEN[key][locale];
}

// ─── Locale parameterization ───

const LOCALES = [
  { locale: "zh" as const, prefix: "", label: "Chinese" },
  { locale: "en" as const, prefix: "/en", label: "English" },
] as const;

for (const { locale, prefix, label } of LOCALES) {
  test.describe(`Home Page (${label})`, () => {
    // ─── Tier 3: smoke ───

    test("loads without errors", async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (err) => errors.push(err.message));

      await page.goto(prefix + "/");
      await expect(page.locator("h1").first()).toBeVisible();
      expect(errors).toEqual([]);
    });

    test("title tag mentions openIndu", async ({ page }) => {
      await page.goto(prefix + "/");
      await expect(page).toHaveTitle(/openIndu/);
    });

    // ─── Tier 1: golden-value copy ───

    test("displays hero OS positioning", async ({ page }) => {
      await page.goto(prefix + "/");
      // Scoped to <h1> -- the tagline is deliberately echoed in the footer
      // description prose, so an unscoped getByText matches both.
      const hero = page.locator("h1");
      await expect(hero).toContainText(gv("heroTitleLine1", locale));
      await expect(hero).toContainText(gv("heroTitleLine2", locale));
      await expect(page.getByText(gv("heroSubtitle", locale))).toBeVisible();
    });

    test("displays three core products section", async ({ page }) => {
      await page.goto(prefix + "/");
      await expect(page.getByText(gv("productsHeading", locale))).toBeVisible();
      // Repo names are invariant proper nouns -- same spelling in both locales.
      // Scoped to <main>: the header nav dropdown and footer "core services" link
      // both also read exactly "openIndu-studio" now, so an unscoped getByText
      // could resolve .first() to a hidden nav element instead of this section.
      const main = page.locator("main");
      await expect(main.getByText("openIndu-studio", { exact: true }).first()).toBeVisible();
      await expect(main.getByText("openIndu-platform", { exact: true }).first()).toBeVisible();
      await expect(main.getByText("openindu-station", { exact: true }).first()).toBeVisible();
    });

    test("displays the five-stage closed loop", async ({ page }) => {
      await page.goto(prefix + "/");
      await expect(page.getByText(gv("nodesHeading", locale))).toBeVisible();
      await expect(page.getByText(gv("nodesSubheading", locale))).toBeVisible();
      for (const title of GOLDEN.nodeTitles[locale]) {
        await expect(page.getByText(title, { exact: true }).first()).toBeVisible();
      }
      await expect(page.getByText(gv("nodeCrossBrandDuty", locale))).toBeVisible();
      await expect(page.getByText(gv("nodeDataDuty", locale))).toBeVisible();
    });

    test("displays open-source repos section", async ({ page }) => {
      await page.goto(prefix + "/");
      await expect(page.getByText(gv("openSourceHeading", locale))).toBeVisible();
      await expect(page.getByText(gv("openSourceCtaHeading", locale))).toBeVisible();
      await expect(page.getByText(gv("openSourceCtaSubheading", locale))).toBeVisible();
      await expect(page.getByText(gv("protocolsTitle", locale))).toBeVisible();
    });

    test("displays WeChat QR block next to CTA", async ({ page }) => {
      await page.goto(prefix + "/");
      await expect(page.getByText(gv("ctaHeading", locale))).toBeVisible();
      await expect(page.getByText(gv("wechatHeading", locale))).toBeVisible();
      await expect(page.locator(`img[alt="${gv("wechatAlt", locale)}"]`)).toBeVisible();
    });

    // ─── Tier 2: structural ───

    test("displays navigation links in header", async ({ page }) => {
      await page.goto(prefix + "/");
      const nav = page.locator("header nav");
      await expect(nav).toBeVisible();

      const testids = [
        "nav-home",
        "nav-downloads",
        "nav-motion-control",
        "nav-vision",
        "nav-iiot-platform",
        "nav-infrastructure",
      ];
      for (const testid of testids) {
        await expect(page.locator("header").getByTestId(testid).first()).toBeVisible();
      }
    });

    test("displays footer with copyright", async ({ page }) => {
      await page.goto(prefix + "/");
      const footer = page.locator("footer");
      await expect(footer).toBeVisible();
      // Brand name -- invariant across locales.
      await expect(footer).toContainText("openIndu Community");
    });
  });
}
