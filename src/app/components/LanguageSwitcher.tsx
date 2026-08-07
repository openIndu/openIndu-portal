import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { detectLocale, alternatePath, stripLocalePrefix } from "@/i18n/locale";
import type { Locale } from "@/i18n/locale";

/** Paths whose pages exist only in Chinese. */
const ZH_ONLY = ["/privacy", "/legal", "/cookies", "/legal-center"];

function isLegalPage(pathname: string): boolean {
  const stripped = stripLocalePrefix(pathname);
  return ZH_ONLY.some((p) => stripped === p || stripped.startsWith(p));
}

/**
 * Language switcher for the header utility bar (desktop) and
 * hamburger menu (mobile). Uses real `<a href>` navigation to
 * cross the basename boundary cleanly.
 */
export function LanguageSwitcher({
  className,
  onNavigate,
}: {
  className?: string;
  /** Called after the user clicks a language link — parent can close the mobile menu. */
  onNavigate?: () => void;
}) {
  const { t } = useTranslation("common");
  const currentLocale = detectLocale();
  const pathname = window.location.pathname;
  const legal = isLegalPage(pathname);
  const targetLocale: Locale = currentLocale === "en" ? "zh" : "en";

  // On legal pages, EN links go home instead of to a nonexistent EN version.
  const targetPath = legal
    ? targetLocale === "en"
      ? "/"
      : stripLocalePrefix(pathname)
    : alternatePath(pathname, targetLocale, true);

  const labels: Record<Locale, string> = {
    zh: t("language.zh"),
    en: t("language.en"),
  };

  return (
    <nav
      className={`flex items-center gap-2 ${className ?? ""}`}
      aria-label={t("language.label")}
    >
      <Globe className="h-4 w-4 text-gray-500 shrink-0" aria-hidden="true" />
      {currentLocale === "zh" ? (
        <>
          <span
            className="text-sm font-medium text-gray-900"
            aria-current="true"
          >
            {labels.zh}
          </span>
          <span className="text-gray-300 select-none">|</span>
          <a
            href={targetPath}
            lang="en"
            className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            onClick={onNavigate}
          >
            {labels.en}
          </a>
        </>
      ) : (
        <>
          <a
            href={targetPath}
            lang="zh-Hans"
            className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            onClick={onNavigate}
          >
            {labels.zh}
          </a>
          <span className="text-gray-300 select-none">|</span>
          <span
            className="text-sm font-medium text-gray-900"
            aria-current="true"
          >
            {labels.en}
          </span>
        </>
      )}
    </nav>
  );
}

/**
 * Segmented-control variant for the mobile hamburger menu.
 * Full-width horizontal pill: two equal halves, active side highlighted.
 */
export function LanguageSwitcherMobile({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const { t } = useTranslation("common");
  const currentLocale = detectLocale();
  const pathname = window.location.pathname;
  const legal = isLegalPage(pathname);
  const targetLocale: Locale = currentLocale === "en" ? "zh" : "en";

  const targetPath = legal
    ? targetLocale === "en"
      ? "/"
      : stripLocalePrefix(pathname)
    : alternatePath(pathname, targetLocale, true);

  return (
    <nav
      className="flex rounded-lg bg-gray-100 p-0.5"
      aria-label={t("language.label")}
    >
      {(["zh", "en"] as Locale[]).map((locale) => {
        const isActive = locale === currentLocale;
        const href = isActive ? undefined : targetPath;
        const label = t(`language.${locale}`);

        const inner = (
          <span
            className={`block w-full rounded-md px-3 py-2 text-center text-sm font-medium transition-colors ${
              isActive
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {label}
          </span>
        );

        return isActive ? (
          <span key={locale} className="flex-1" aria-current="true">
            {inner}
          </span>
        ) : (
          <a
            key={locale}
            href={href!}
            lang={locale === "en" ? "en" : "zh-Hans"}
            className="flex-1"
            onClick={onNavigate}
          >
            {inner}
          </a>
        );
      })}
    </nav>
  );
}
