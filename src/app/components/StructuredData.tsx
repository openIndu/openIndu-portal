import { useEffect } from "react";

/** Path segment → human-readable name for BreadcrumbList generation. */
const BREADCRUMB_NAMES: Record<string, string> = {
  "motion-control": "AI+运动控制",
  studio: "openIndu-studio 平台",
  vision: "AI+视觉",
  "iiot-platform": "AI+工业互联网平台",
  infrastructure: "AI+基础设施",
  resources: "下载中心",
  documents: "文档资料",
  software: "软件工具",
  privacy: "隐私声明",
  legal: "法律声明",
  cookies: "关于 Cookies",
  "legal-center": "法律与隐私",
};

function buildBreadcrumbList(pathname: string, origin: string) {
  // /motion-control/studio → ["motion-control", "studio"]
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    // Home page — no breadcrumb needed, but return empty list
    return [];
  }

  const items: Array<{ name: string; item: string }> = [
    { name: "首页", item: origin + "/" },
  ];

  let accumulated = "";
  for (const seg of segments) {
    accumulated += "/" + seg;
    const name = BREADCRUMB_NAMES[seg] || seg;
    items.push({ name, item: origin + accumulated });
  }

  return items;
}

interface StructuredDataProps {
  /** Page-level: title (for WebPage schema). Falls back to document.title. */
  pageTitle?: string;
  /** Page-level: description (for WebPage schema). */
  pageDescription?: string;
  /** Page-level: canonical path (for WebPage schema url). */
  pagePath?: string;
}

/**
 * Injects site-level (Organization + WebSite) and page-level
 * (BreadcrumbList + WebPage) JSON-LD structured data.
 *
 * Site-level schemas are injected once and persist across navigations.
 * Page-level schemas are re-injected when pathname changes.
 */
export function StructuredData({
  pageTitle,
  pageDescription,
  pagePath,
}: StructuredDataProps = {}) {
  useEffect(() => {
    const origin = window.location.origin;
    const pathname = pagePath ?? window.location.pathname;
    const url = origin + pathname;

    // --- Site-level schemas (persistent) ---
    const sitePayload = [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "openIndu Community",
        alternateName: "openIndu",
        url: origin,
        logo: `${origin}/assets/logo.png`,
        description:
          "面向智能制造场景的开源工业生态，提供工业互联网平台、PLC 开发工作流、资源中心与 AI 赋能解决方案。",
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "openIndu Community",
        url: origin,
        potentialAction: {
          "@type": "SearchAction",
          target: `${origin}/resources?keyword={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ];

    // --- Page-level schemas ---
    const breadcrumb = buildBreadcrumbList(pathname, origin);

    const pagePayload: Record<string, unknown>[] = [];

    if (breadcrumb.length > 0) {
      pagePayload.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumb.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.item,
        })),
      });
    }

    pagePayload.push({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: pageTitle || document.title,
      description:
        pageDescription ||
        "openIndu Community — 开源智能制造工业生态",
      url,
      dateModified: "2026-07-01",
      isPartOf: {
        "@type": "WebSite",
        name: "openIndu Community",
        url: origin,
      },
      about: {
        "@type": "Thing",
        name: "智能制造与工业自动化",
      },
    });

    // --- Inject ---
    const allPayload = [...sitePayload, ...pagePayload];

    // Remove any previous openIndu JSON-LD scripts to avoid duplicates
    document.head
      .querySelectorAll('script[data-openindu-jsonld]')
      .forEach((el) => el.remove());

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-openindu-jsonld", "1");
    script.textContent = JSON.stringify(allPayload);
    document.head.appendChild(script);

    return () => {
      // Only clean up page-level on unmount; site-level persists
      script.parentElement?.removeChild(script);
    };
  }, [pageTitle, pageDescription, pagePath]);

  return null;
}
