import { useEffect } from "react";

/**
 * Site-wide structured data (JSON-LD) for Google.
 * Injects Organization + WebSite schemas once on mount; removed on unmount so
 * dev hot-reload doesn't accumulate duplicates.
 */
export function StructuredData() {
  useEffect(() => {
    const origin = window.location.origin;
    const payload = [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "openIndu Community",
        alternateName: "openIndu",
        url: origin,
        logo: `${origin}/assets/logo.png`,
        description: "面向智能制造场景的开源工业生态，提供工业互联网平台、PLC 开发工作流、资源中心与 AI 赋能解决方案。",
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

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-openindu-jsonld", "1");
    script.textContent = JSON.stringify(payload);
    document.head.appendChild(script);
    return () => {
      script.parentElement?.removeChild(script);
    };
  }, []);

  return null;
}
