import { useEffect } from "react";
import { detectLocale } from "@/i18n/locale";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  /** Locale-neutral path, e.g. "/vision".  SEO will prefix with "/en" when needed. */
  canonicalPath?: string;
  /** Absolute or root-relative image for og:image / twitter:image. */
  image?: string;
  /**
   * Whether this page exists in both languages (default true).
   * Set to false for LegalPages — no hreflang alternate is emitted and
   * the canonical always points to the ZH version.
   */
  localized?: boolean;
}

// ── helpers ──────────────────────────────────────────────────────────

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) =>
    element?.setAttribute(key, value),
  );
}

function upsertLink(
  selector: string,
  attributes: Record<string, string>,
) {
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) =>
    element?.setAttribute(key, value),
  );
}

/** Replace all hreflang alternates with the given list. */
function setHreflangs(alternates: Array<{ hreflang: string; href: string }>) {
  // Remove existing alternates
  document.head
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((el) => el.remove());
  // Add new ones
  for (const { hreflang, href } of alternates) {
    const link = document.createElement("link");
    link.setAttribute("rel", "alternate");
    link.setAttribute("hreflang", hreflang);
    link.setAttribute("href", href);
    document.head.appendChild(link);
  }
}

// ── component ────────────────────────────────────────────────────────

export function SEO({
  title,
  description,
  keywords,
  canonicalPath,
  image,
  localized = true,
}: SEOProps) {
  useEffect(() => {
    const origin = window.location.origin;
    const pathLocale = detectLocale();
    // When localized=false the page only exists in ZH; force locale for
    // og:locale / <html lang> regardless of what the URL prefix says.
    const pageLocale = localized ? pathLocale : "zh";
    const prefix = pageLocale === "en" ? "/en" : "";

    // Canonical URL: locale-neutral path + locale prefix
    const fullCanonical = canonicalPath
      ? `${origin}${localized ? prefix : ""}${canonicalPath}`
      : window.location.href;

    const imageUrl = image
      ? image.startsWith("http")
        ? image
        : `${origin}${image}`
      : `${origin}/assets/og-image.png`;

    // <html lang>
    document.documentElement.lang = pageLocale === "en" ? "en" : "zh-CN";

    // Basic meta
    document.title = title;
    upsertMeta('meta[name="description"]', {
      name: "description",
      content: description,
    });
    if (keywords)
      upsertMeta('meta[name="keywords"]', { name: "keywords", content: keywords });

    // Open Graph
    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: title,
    });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website",
    });
    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: "openIndu Community",
    });
    upsertMeta('meta[property="og:locale"]', {
      property: "og:locale",
      content: pageLocale === "en" ? "en_US" : "zh_CN",
    });
    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: fullCanonical,
    });
    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: imageUrl,
    });

    // Twitter
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: title,
    });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: imageUrl,
    });

    // Canonical
    upsertLink('link[rel="canonical"]', {
      rel: "canonical",
      href: fullCanonical,
    });

    // hreflang alternates
    if (localized && canonicalPath) {
      setHreflangs([
        {
          hreflang: "zh-Hans",
          href: `${origin}${canonicalPath}`,
        },
        {
          hreflang: "en",
          href: `${origin}/en${canonicalPath}`,
        },
        {
          hreflang: "x-default",
          href: `${origin}${canonicalPath}`,
        },
      ]);
    } else {
      setHreflangs([]);
    }
  }, [canonicalPath, description, image, keywords, localized, title]);

  return null;
}
